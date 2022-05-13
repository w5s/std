import { Option } from '@w5s/core';
import { FilePath } from './path';

describe('FilePath', () => {
  const absolutePath = (...parts: string[]) => (FilePath.separator + parts.join(FilePath.separator)) as FilePath;
  const relativePath = (...parts: string[]) => parts.join(FilePath.separator) as FilePath;
  describe(FilePath.dirname, () => {
    test('should return the dirname of parameter', () => {
      const path = absolutePath('one', 'two', 'three');
      expect(FilePath.dirname(path)).toBe(`${FilePath.separator}one${FilePath.separator}two`);
    });
  });

  describe(FilePath.join, () => {
    test('should return joined path using separator', () => {
      const first = absolutePath('hello', 'world');
      const second = relativePath('..', 'earth');
      expect(FilePath.join(first, second)).toBe(absolutePath('hello', 'earth'));
    });
  });

  describe(FilePath.resolve, () => {
    test('return a resolved path', () => {
      expect(FilePath.resolve([absolutePath('goodbye'), absolutePath('hello')], relativePath('world'))).toBe(
        absolutePath('hello', 'world')
      );
    });
  });

  describe(FilePath.parse, () => {
    test('should parse empty path', () => {
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

  describe(FilePath.format, () => {
    test('should format empty path object', () => {
      expect(
        FilePath.format({
          root: Option.None,
          base: Option.None,
          dir: Option.None,
          ext: Option.None,
          name: Option.None,
        })
      ).toBe('');
    });
  });

  describe(FilePath.relative, () => {
    test('should return a relative path', () => {
      const from = absolutePath('home', 'hello', 'world');
      const to = absolutePath('user', 'hello', 'earth');
      expect(FilePath.relative(from, to)).toBe(relativePath('..', '..', '..', 'user', 'hello', 'earth'));
    });
  });

  describe(FilePath.normalize, () => {
    test('return a normalized path', () => {
      const path = relativePath('hello', 'world', '..', 'earth');
      expect(FilePath.normalize(path)).toBe(relativePath('hello', 'earth'));
    });
  });

  describe(FilePath.basename, () => {
    test('return the base name of file path', () => {
      const path = absolutePath('hello', 'world', 'file.txt');

      expect(FilePath.basename(path)).toBe(`file.txt`);
      expect(FilePath.basename(path, `.txt`)).toBe(`file`);
    });
  });
  describe(FilePath.extname, () => {
    test('return the base name of file path', () => {
      const path = relativePath('world', 'file.log.txt');
      expect(FilePath.extname(path)).toBe(`.txt`);
    });
  });

  describe(FilePath.isAbsolute, () => {
    test('return absolute path', () => {
      const absolute = absolutePath('world', 'file.log.txt');
      expect(FilePath.isAbsolute(absolute)).toBe(true);
      const relative = relativePath('.', 'world', 'file.log.txt');
      expect(FilePath.isAbsolute(relative)).toBe(false);
    });
  });
  describe(FilePath.isRelative, () => {
    test('return absolute path', () => {
      const absolute = absolutePath('world', 'file.log.txt');
      expect(FilePath.isRelative(absolute)).toBe(false);
      const relative = relativePath('.', 'world', 'file.log.txt');
      expect(FilePath.isRelative(relative)).toBe(true);
    });
  });
  describe(FilePath.isParentOf, () => {
    test.each([
      [{ parent: '', child: '' }, false],
      [{ parent: '/first/second', child: '/first' }, false],
      [{ parent: '/first', child: '/first' }, false],
      [{ parent: '/first', child: '/first/second' }, true],
      [{ parent: 'first', child: 'first/second' }, true],
      [{ parent: '../first', child: '../first/second' }, true],
      [{ parent: 'c:\\first', child: 'c:\\first' }, false],
      [{ parent: 'c:\\first', child: 'c:\\first\\second' }, true],
    ] as const)('should return correct value for %s', ({ parent, child }, expected) => {
      expect(FilePath.isParentOf(FilePath(parent), FilePath(child))).toBe(expected);
    });
  });
});
