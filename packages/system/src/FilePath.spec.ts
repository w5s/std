import { Option } from '@w5s/core';
import { describe, it, expect } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { FilePath } from './FilePath.js';

describe('FilePath', () => {
  const absolutePath = (...parts: string[]) => (FilePath.separator + parts.join(FilePath.separator)) as FilePath;
  const relativePath = (...parts: string[]) => parts.join(FilePath.separator) as FilePath;
  const expectTask = withTask(expect);

  describe('.dirname', () => {
    it('should return the dirname of parameter', () => {
      const path = absolutePath('one', 'two', 'three');
      expect(FilePath.dirname(path)).toBe(`${FilePath.separator}one${FilePath.separator}two`);
    });
  });

  describe('.concat', () => {
    it('should return joined path using separator', () => {
      const first = absolutePath('hello', 'world');
      const second = relativePath('..', 'earth');
      expect(FilePath.concat([first, second])).toBe(absolutePath('hello', 'earth'));
    });
  });

  describe('.resolve', () => {
    it('return a resolved path', async () => {
      expectTask(
        FilePath.resolve(
          [absolutePath(''), relativePath('bar', 'baz'), relativePath('..', 'baz2')],
          relativePath('foo'),
        ),
      ).toResolveSync(absolutePath('bar', 'baz2', 'foo'));
      expectTask(FilePath.resolve([absolutePath('foo', 'bar')], relativePath('./baz'))).toResolveSync(
        absolutePath('foo', 'bar', 'baz'),
      );
      expectTask(FilePath.resolve([absolutePath('foo', 'bar')], absolutePath('tmp', 'file', ''))).toResolveSync(
        absolutePath('tmp', 'file'),
      );
      expectTask(
        FilePath.resolve(
          [relativePath('wwwroot'), relativePath('static_files', 'png')],
          relativePath('..', 'gif', 'image.gif'),
        ),
      ).toResolveSync(relativePath(process.cwd(), 'wwwroot', 'static_files', 'gif', 'image.gif'));
    });
  });

  describe('.parse', () => {
    it('should parse empty path', () => {
      const path = relativePath('');
      expect(FilePath.parse(path)).toStrictEqual({
        root: Option.None,
        base: Option.None,
        dir: Option.None,
        ext: Option.None,
        name: Option.None,
      });
    });
  });

  describe('.format', () => {
    it('should format empty path object', () => {
      expect(
        FilePath.format({
          root: Option.None,
          base: Option.None,
          dir: Option.None,
          ext: Option.None,
          name: Option.None,
        }),
      ).toBe('');
    });
  });

  describe('.relative', () => {
    it('should return a relative path', () => {
      const from = absolutePath('home', 'hello', 'world');
      const to = absolutePath('home', 'earth');
      expect(FilePath.relative(from, to)).toBe(relativePath('..', '..', 'earth'));
    });
  });

  describe('.normalize', () => {
    it('return a normalized path', () => {
      const path = relativePath('hello', 'world', '..', 'earth');
      expect(FilePath.normalize(path)).toBe(relativePath('hello', 'earth'));
    });
  });

  describe('.basename', () => {
    it('return the base name of file path', () => {
      const path = absolutePath('hello', 'world', 'file.txt');

      expect(FilePath.basename(path)).toBe(`file.txt`);
      expect(FilePath.basename(path, `.txt`)).toBe(`file`);
    });
  });
  describe('.extname', () => {
    it('return the base name of file path', () => {
      const path = relativePath('world', 'file.log.txt');
      expect(FilePath.extname(path)).toBe(`.txt`);
    });
  });

  describe('.isAbsolute', () => {
    it('return absolute path', () => {
      const absolute = absolutePath('world', 'file.log.txt');
      expect(FilePath.isAbsolute(absolute)).toBe(true);
      const relative = relativePath('.', 'world', 'file.log.txt');
      expect(FilePath.isAbsolute(relative)).toBe(false);
    });
  });
  describe('.isRelative', () => {
    it('return absolute path', () => {
      const absolute = absolutePath('world', 'file.log.txt');
      expect(FilePath.isRelative(absolute)).toBe(false);
      const relative = relativePath('.', 'world', 'file.log.txt');
      expect(FilePath.isRelative(relative)).toBe(true);
    });
  });
  describe('.isParentOf', () => {
    it.each([
      [{ parent: '', child: '' }, false],
      [{ parent: '/first/second', child: '/first' }, false],
      [{ parent: '/first', child: '/first' }, false],
      [{ parent: '/first', child: '/first/second' }, true],
      [{ parent: 'first', child: 'first/second' }, true],
      [{ parent: '../first', child: '../first/second' }, true],
      [{ parent: String.raw`c:\first`, child: String.raw`c:\first` }, false],
      [{ parent: String.raw`c:\first`, child: String.raw`c:\first\second` }, true],
    ] as [{ parent: string; child: string }, boolean][])(
      'should return correct value for %s',
      ({ parent, child }, expected) => {
        expect(FilePath.isParentOf(FilePath(parent), FilePath(child))).toBe(expected);
      },
    );
  });
});
