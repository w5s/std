import nodePath from 'node:path';
import type { Tag, Option } from '@w5s/core';
import type { Task } from '@w5s/task';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';

export type FileName = string;

export type FilePath = string & Tag<'FilePath'>;
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
    return value === '' ? undefined : (value as V);
  }

  export const delimiter: Delimiter = nodePath.delimiter as Delimiter;
  export const separator: Separator = nodePath.sep as Separator;

  /**
   * Normalize a string path, reducing '..' and '.' parts. When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.
   *
   * @example
   * ```typescript
   * const path = FilePath.normalize('foo/./bar/../baz//quux/');// FilePath('foo/baz/quux/')
   * ```
   * @param path - The path to normalize
   */
  export function normalize(path: FilePath): FilePath {
    return nodePath.normalize(path) as FilePath;
  }

  /**
   * Return the last portion of a path. Similar to the Unix basename command.
   * Often used to extract the file name from a fully qualified path.
   *
   * @example
   * ```typescript
   * const path = FilePath.basename('/foo/bar.html');// 'bar.html'
   * ```
   * @param path - The path to extract base name from
   * @param extension - The extension to remove
   */
  export function basename(path: FilePath, extension?: Option<Extension>): FileName {
    return nodePath.basename(path, extension) as FilePath;
  }

  /**
   * Return the directory name of a path. Similar to the Unix dirname command.
   *
   * @example
   * ```typescript
   * const path = FilePath.dirname('/foo/bar.html');// '/foo'
   * ```
   * @param path - The path to extract directory name from
   */
  export function dirname(path: FilePath): FilePath {
    return nodePath.dirname(path) as FilePath;
  }

  /**
   * Return the extension of the path, from the last '.' to end of string in the last portion of the path.
   * If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string
   *
   * @example
   * ```typescript
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
   * ```typescript
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
    return nodePath.format({
      root: orEmpty(parsed.root),
      dir: orEmpty(parsed.dir),
      base: orEmpty(parsed.base),
      ext: orEmpty(parsed.ext),
      name: orEmpty(parsed.name),
    }) as FilePath;
  }

  /**
   * Returns an object from a path string - the opposite of `format()`.
   *
   * @example
   * ```typescript
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
   * Solve the relative path from `from` to `to`.
   * At times we have two absolute paths, and we need to derive the relative path from one to the other. This is actually the reverse transform of {@link resolve}.
   *
   * @example
   * ```typescript
   * const from = FilePath('home/hello/world');
   * const to = FilePath('home/earth');
   * FilePath.relative(from, to);// FilePath('../../earth')
   * ```
   * @param from - The source path
   * @param to - The destination path
   */
  export function relative(from: FilePath, to: FilePath): FilePath {
    return nodePath.relative(from, to) as FilePath;
  }

  /**
   * The right-most parameter is considered `to`.  Other parameters are considered an array of `from`.
   *
   * Starting from leftmost `from` parameter, resolves `to` to an absolute path.
   *
   * If `to` isn't already absolute, `from` arguments are prepended in right to left order,
   * until an absolute path is found. If after using all `from` paths still no absolute path is found,
   * the current working directory is used as well. The resulting path is normalized,
   * and trailing slashes are removed unless the path gets resolved to the root directory.
   *
   * @example
   * ```typescript
   * const from = [FilePath('/goodbye'), FilePath('/hello')];
   * const to = FilePath('./world');
   * FilePath.resolve(from, to);// Task.resolve(FilePath('/hello/world'))
   * ```
   * @param from - The source path
   * @param to - The destination path
   */
  export function resolve(from: ReadonlyArray<FilePath>, to: FilePath): Task<FilePath, never> {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return taskFrom(({ resolve }) => resolve(nodePath.resolve(...from, to) as FilePath));
  }

  /**
   * Join all arguments together and normalize the resulting path.
   *
   * @example
   * ```typescript
   * const paths = [FilePath('hello'), FilePath('world')];
   * FilePath.concat(paths);// FilePath('hello/world')
   * ```
   * @param paths - paths to join.
   */
  export function concat(paths: ReadonlyArray<FilePath | FileName>): FilePath {
    return nodePath.join(...paths) as FilePath;
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
    const subPathWithTrailingSep = subPathNormalized.endsWith(nodePath.sep)
      ? subPathNormalized
      : subPathNormalized + nodePath.sep;

    return subPathWithTrailingSep.startsWith(parentPathNormalized);
  }
}
