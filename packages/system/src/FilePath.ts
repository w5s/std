import nodePath from 'node:path';
import type { Tag, Option } from '@w5s/core';
import type { Task } from '@w5s/task';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';

function orEmpty<V>(optionalValue: Option<V>) {
  return optionalValue == null ? '' : optionalValue;
}

function filterNotEmpty<V extends string>(value: string): Option<V> {
  return value === '' ? undefined : (value as V);
}

export type FileName = string;

export type FilePath = string & Tag<'FilePath'>;

/**
 * @namespace
 */
export const FilePath = Object.assign(
  // eslint-disable-next-line @typescript-eslint/no-shadow, prefer-arrow-callback
  function FilePath(value: string): FilePath {
    return value as FilePath;
  },
  {
    delimiter: nodePath.delimiter as FilePath.Delimiter,
    separator: nodePath.sep as FilePath.Separator,

    /**
     * Normalize a string path, reducing '..' and '.' parts. When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.
     *
     * @example
     * ```typescript
     * const path = FilePath.normalize('foo/./bar/../baz//quux/');// FilePath('foo/baz/quux/')
     * ```
     * @param path - The path to normalize
     */
    normalize(path: FilePath): FilePath {
      return nodePath.normalize(path) as FilePath;
    },

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
    basename(path: FilePath, extension?: Option<FilePath.Extension>): FileName {
      return nodePath.basename(path, extension) as FilePath;
    },

    /**
     * Return the directory name of a path. Similar to the Unix dirname command.
     *
     * @example
     * ```typescript
     * const path = FilePath.dirname('/foo/bar.html');// '/foo'
     * ```
     * @param path - The path to extract directory name from
     */
    dirname(path: FilePath): FilePath {
      return nodePath.dirname(path) as FilePath;
    },

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
    extname(path: FilePath): FilePath.Extension {
      return nodePath.extname(path) as FilePath.Extension;
    },

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
    format(parsed: Partial<FilePath.Parsed>): FilePath {
      return nodePath.format({
        root: orEmpty(parsed.root),
        dir: orEmpty(parsed.dir),
        base: orEmpty(parsed.base),
        ext: orEmpty(parsed.ext),
        name: orEmpty(parsed.name),
      }) as FilePath;
    },

    /**
     * Returns an object from a path string - the opposite of `format()`.
     *
     * @example
     * ```typescript
     * const path = FilePath.parse('/foo/bar.html');// { root: '/', dir: '/foo', base: 'bar.html', ext: '.html', name: 'bar' }
     * ```
     * @param string - The path to parse
     */
    parse(string: FilePath): FilePath.Parsed {
      const parsed = nodePath.parse(string);
      return {
        root: filterNotEmpty<FilePath>(parsed.root),
        dir: filterNotEmpty<FilePath>(parsed.dir),
        base: filterNotEmpty<FileName>(parsed.base),
        ext: filterNotEmpty<FilePath.Extension>(parsed.ext),
        name: filterNotEmpty<FileName>(parsed.name),
      };
    },

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
    relative(from: FilePath, to: FilePath): FilePath {
      return nodePath.relative(from, to) as FilePath;
    },

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
    resolve(from: ReadonlyArray<FilePath>, to: FilePath): Task<FilePath, never> {
      return taskFrom(({ resolve }) => resolve(nodePath.resolve(...from, to) as FilePath));
    },

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
    concat(paths: ReadonlyArray<FilePath | FileName>): FilePath {
      return nodePath.join(...paths) as FilePath;
    },

    isAbsolute(path: FilePath): boolean {
      return nodePath.isAbsolute(path);
    },

    isRelative(path: FilePath): boolean {
      return !nodePath.isAbsolute(path);
    },

    isParentOf(parentPath: FilePath, childPath: FilePath): boolean {
      const parentPathNormalized = nodePath.normalize(parentPath);

      if (childPath.length <= parentPathNormalized.length) {
        return false;
      }

      const subPathNormalized = nodePath.normalize(childPath);
      const subPathWithTrailingSep = subPathNormalized.endsWith(nodePath.sep)
        ? subPathNormalized
        : subPathNormalized + nodePath.sep;

      return subPathWithTrailingSep.startsWith(parentPathNormalized);
    },
  },
);
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
}
