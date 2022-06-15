/* eslint-disable prefer-destructuring */
import { Tag, Option } from '@w5s/core';
import * as nodePath from 'node:path';

export type FileName = string;

export type FilePath = Tag<string, { filePath: true }>;
export function FilePath(value: string): FilePath {
  return value as FilePath;
}
export namespace FilePath {
  export type Delimiter = ':' | ';';
  export type Extension = `.${string}`;
  export type Separator = '/' | '\\';

  export interface Parsed {
    readonly root: Option<FilePath>;
    readonly dir: Option<FilePath>;
    readonly base: Option<FileName>;
    readonly ext: Option<Extension>;
    readonly name: Option<FileName>;
  }

  function orEmpty<V>(optionalValue: Option<V>) {
    return optionalValue == null ? '' : optionalValue;
  }

  function filterNotEmpty<V extends string>(value: string): Option<V> {
    return value !== '' ? (value as V) : Option.None;
  }

  function wrap(pathString: string): FilePath {
    return pathString as FilePath;
  }

  export const delimiter: Delimiter = nodePath.delimiter as Delimiter;
  export const separator: Separator = nodePath.sep as Separator;

  /**
   * Normalize a string path, reducing '..' and '.' parts. When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.
   *
   * @example
   * ```ts
   * const path = FilePath.normalize('foo/./bar/../baz//quux/');// FilePath('foo/baz/quux/')
   * ```
   * @param path - The path to normalize
   */
  export function normalize(path: FilePath): FilePath {
    return wrap(nodePath.normalize(path));
  }

  /**
   * Return the last portion of a path. Similar to the Unix basename command.
   * Often used to extract the file name from a fully qualified path.
   *
   * @example
   * ```ts
   * const path = FilePath.basename('/foo/bar.html');// 'bar.html'
   * ```
   * @param path - The path to extract base name from
   * @param extension - The extension to remove
   */
  export function basename(path: FilePath, extension?: Option<Extension>): FileName {
    return wrap(nodePath.basename(path, extension));
  }

  /**
   * Return the directory name of a path. Similar to the Unix dirname command.
   *
   * @example
   * ```ts
   * const path = FilePath.dirname('/foo/bar.html');// '/foo'
   * ```
   * @param path - The path to extract directory name from
   */
  export function dirname(path: FilePath): FilePath {
    return wrap(nodePath.dirname(path));
  }

  /**
   * Return the extension of the path, from the last '.' to end of string in the last portion of the path.
   * If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string
   *
   * @example
   * ```ts
   * const path = FilePath.extname('/foo/bar.html');// '.html'
   * ```
   * @param path - The path to extract extension name from
   */
  export function extname(path: FilePath): Extension {
    return nodePath.extname(path) as Extension;
  }

  /**
   * Returns a path string from an object - the opposite of `parse()`.
   *
   * @example
   * ```ts
   * const formatted = FilePath.format({
   *   root: '/',
   *   dir: '/home/user/dir',
   *   base: 'file.txt',
   *   ext: '.txt',
   *   name: 'file'
   * });// FilePath('/home/user/dir/file.txt')
   * @param parsed - The parsed path
   */
  export function format(parsed: Partial<Parsed>): FilePath {
    return wrap(
      nodePath.format({
        root: orEmpty(parsed.root),
        dir: orEmpty(parsed.dir),
        base: orEmpty(parsed.base),
        ext: orEmpty(parsed.ext),
        name: orEmpty(parsed.name),
      })
    );
  }

  /**
   * Returns an object from a path string - the opposite of `format()`.
   *
   * @example
   * ```ts
   * const path = FilePath.parse('/foo/bar.html');// { root: '/', dir: '/foo', base: 'bar.html', ext: '.html', name: 'bar' }
   * ```
   * @param string - The path to parse
   */
  export function parse(string: FilePath): Parsed {
    const parsed = nodePath.parse(string);
    return {
      root: filterNotEmpty<FilePath>(parsed.root),
      dir: filterNotEmpty<FilePath>(parsed.dir),
      base: filterNotEmpty<FileName>(parsed.base),
      ext: filterNotEmpty<Extension>(parsed.ext),
      name: filterNotEmpty<FileName>(parsed.name),
    };
  }

  /**
   *
   * @param from - The source path
   * @param to - The target path
   */
  export function relative(from: FilePath, to: FilePath): FilePath {
    return wrap(nodePath.relative(from, to));
  }

  export function resolve(from: ReadonlyArray<FilePath>, to: FilePath): FilePath {
    return wrap(nodePath.resolve(...from, to));
  }

  export function join(...paths: (FilePath | FileName)[]): FilePath {
    return wrap(nodePath.join(...paths));
  }

  export function isAbsolute(path: FilePath): boolean {
    return nodePath.isAbsolute(path);
  }

  export function isRelative(path: FilePath): boolean {
    return !nodePath.isAbsolute(path);
  }

  export function isParentOf(parentPath: FilePath, childPath: FilePath): boolean {
    const parentPathNormalized = nodePath.normalize(parentPath);

    if (childPath.length <= parentPathNormalized.length) {
      return false;
    }

    const subPathNormalized = nodePath.normalize(childPath);
    const subPathWithTrailingSep = !subPathNormalized.endsWith(nodePath.sep)
      ? subPathNormalized + nodePath.sep
      : subPathNormalized;

    return subPathWithTrailingSep.startsWith(parentPathNormalized);
  }
}
