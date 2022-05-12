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

  export function normalize(path: FilePath): FilePath {
    return wrap(nodePath.normalize(path));
  }

  export function basename(path: FilePath, extension?: Option<Extension>): FileName {
    return wrap(nodePath.basename(path, extension));
  }

  export function dirname(path: FilePath): FilePath {
    return wrap(nodePath.dirname(path));
  }

  export function extname(path: FilePath): Extension {
    return nodePath.extname(path) as Extension;
  }

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
}
