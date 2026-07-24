import { Option } from '@w5s/core';
import { withTask } from '@w5s/task/dist/Testing.js';
import { describe, expect, it } from 'vitest';

import { FilePath } from './FilePath.js';

describe('FilePath', () => {
  const { basename, concat, dirname, extname, format, isAbsolute, isParentOf, isRelative, normalize, parse, relative, resolve, separator } = FilePath;
  const absolutePath = (...parts: Array<string>) => (separator + parts.join(separator)) as FilePath;
  const relativePath = (...parts: Array<string>) => parts.join(separator) as FilePath;
  const expectTask = withTask(expect);

  describe(dirname, () => {
    it('should return the dirname of parameter', () => {
      const path = absolutePath('one', 'two', 'three');
      expect(dirname(path)).toBe(`${separator}one${separator}two`);
    });
  });

  describe(concat, () => {
    it('should return joined path using separator', () => {
      const first = absolutePath('hello', 'world');
      const second = relativePath('..', 'earth');
      expect(concat([first, second])).toBe(absolutePath('hello', 'earth'));
    });
  });

  describe(resolve, () => {
    it('return a resolved path', async () => {
      expectTask(
        resolve(
          [absolutePath(''), relativePath('bar', 'baz'), relativePath('..', 'baz2')],
          relativePath('foo'),
        ),
      ).toResolveSync(absolutePath('bar', 'baz2', 'foo'));
      expectTask(resolve([absolutePath('foo', 'bar')], relativePath('./baz'))).toResolveSync(
        absolutePath('foo', 'bar', 'baz'),
      );
      expectTask(resolve([absolutePath('foo', 'bar')], absolutePath('tmp', 'file', ''))).toResolveSync(
        absolutePath('tmp', 'file'),
      );
      expectTask(
        resolve(
          [relativePath('wwwroot'), relativePath('static_files', 'png')],
          relativePath('..', 'gif', 'image.gif'),
        ),
      ).toResolveSync(relativePath(process.cwd(), 'wwwroot', 'static_files', 'gif', 'image.gif'));
    });
  });

  describe(parse, () => {
    it('should parse empty path', () => {
      const path = relativePath('');
      expect(parse(path)).toStrictEqual({
        base: Option.None,
        dir: Option.None,
        ext: Option.None,
        name: Option.None,
        root: Option.None,
      });
    });
  });

  describe(format, () => {
    it('should format empty path object', () => {
      expect(
        format({
          base: Option.None,
          dir: Option.None,
          ext: Option.None,
          name: Option.None,
          root: Option.None,
        }),
      ).toBe('');
    });
  });

  describe(relative, () => {
    it('should return a relative path', () => {
      const from = absolutePath('home', 'hello', 'world');
      const to = absolutePath('home', 'earth');
      expect(relative(from, to)).toBe(relativePath('..', '..', 'earth'));
    });
  });

  describe(normalize, () => {
    it('return a normalized path', () => {
      const path = relativePath('hello', 'world', '..', 'earth');
      expect(normalize(path)).toBe(relativePath('hello', 'earth'));
    });
  });

  describe(basename, () => {
    it('return the base name of file path', () => {
      const path = absolutePath('hello', 'world', 'file.txt');

      expect(basename(path)).toBe(`file.txt`);
      expect(basename(path, `.txt`)).toBe(`file`);
    });
  });
  describe(extname, () => {
    it('return the base name of file path', () => {
      const path = relativePath('world', 'file.log.txt');
      expect(extname(path)).toBe(`.txt`);
      const noExt = relativePath('world', 'file');
      expect(extname(noExt)).toBe(``);
    });
  });

  describe(isAbsolute, () => {
    it('return absolute path', () => {
      const absolute = absolutePath('world', 'file.log.txt');
      expect(isAbsolute(absolute)).toBe(true);
      const _relative = relativePath('.', 'world', 'file.log.txt');
      expect(isAbsolute(_relative)).toBe(false);
    });
  });
  describe(isRelative, () => {
    it('return absolute path', () => {
      const absolute = absolutePath('world', 'file.log.txt');
      expect(isRelative(absolute)).toBe(false);
      const _relative = relativePath('.', 'world', 'file.log.txt');
      expect(isRelative(_relative)).toBe(true);
    });
  });
  describe(isParentOf, () => {
    it.each([
      [{ child: '', parent: '' }, false],
      [{ child: '/first', parent: '/first/second' }, false],
      [{ child: '/first', parent: '/first' }, false],
      [{ child: '/first/second', parent: '/first' }, true],
      [{ child: 'first/second', parent: 'first' }, true],
      [{ child: '../first/second', parent: '../first' }, true],
      [{ child: String.raw`c:\first`, parent: String.raw`c:\first` }, false],
      [{ child: String.raw`c:\first\second`, parent: String.raw`c:\first` }, true],
    ] as Array<[{ child: string; parent: string }, boolean]>)(
      'should return correct value for %s',
      ({ child, parent }, expected) => {
        expect(isParentOf(FilePath(parent), FilePath(child))).toBe(expected);
      },
    );
  });
});
