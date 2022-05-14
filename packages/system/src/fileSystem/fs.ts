import { Task, Array, ignore, Option } from '@w5s/core';
import type * as nodeFS from 'node:fs';
import { FileError } from '../error';
import { Internal, errnoTask, errnoExceptionHandler } from '../internal';
import { FilePath } from '../path';

export function listDirectory(filePath: FilePath, options?: listDirectory.Options): Task<Array<FilePath>, FileError> {
  // @ts-ignore - `readdir` returns an array of strings instead of a Array<FilePath>
  return errnoTask<[path: nodeFS.PathLike, options?: BufferEncoding], string[]>(Internal.FS.readdir)(filePath, options);
}
export namespace listDirectory {
  export type Options = BufferEncoding;
}

export function createDirectory(path: FilePath, options?: createDirectory.Options): Task<void, FileError> {
  return Task.map(errnoTask(Internal.FS.mkdir)(path, options), ignore);
}
export namespace createDirectory {
  export type Options = nodeFS.MakeDirectoryOptions;
}

export const lstat = errnoTask<[pathLike: nodeFS.PathLike], nodeFS.Stats>((pathLike) =>
  Internal.FS.lstat(pathLike, { bigint: false })
);
export const stat = errnoTask<[pathLike: nodeFS.PathLike], nodeFS.Stats>((pathLike) =>
  Internal.FS.stat(pathLike, { bigint: false })
);
export const symlink = errnoTask(Internal.FS.symlink);

export function copyFile(source: FilePath, destination: FilePath): Task<void, FileError> {
  return errnoTask(Internal.FS.copyFile)(source, destination);
}

export function rename(oldPath: FilePath, newPath: FilePath): Task<void, FileError> {
  return errnoTask(Internal.FS.rename)(oldPath, newPath);
}

export function remove(filePath: FilePath, options?: remove.Options): Task<void, FileError> {
  return errnoTask(Internal.FS.rm)(filePath, options);
}
export namespace remove {
  export type Options = nodeFS.RmOptions;
}

/**
 * Asynchronously writes data to a file, replacing the file if it already exists.
 *
 * @example
 * ```ts
 * const write = writeFile(FilePath('my/file'), 'my content');
 * Task.unsafeRun(write);
 * ```
 * @param file Path to the file to be read.
 * @param data The buffer that the data will be appended to.
 * @param options An object of write options
 */
export function writeFile(
  file: FilePath,
  data:
    | string
    | NodeJS.TypedArray
    | DataView
    | AsyncIterable<string | NodeJS.TypedArray | DataView>
    | Iterable<string | NodeJS.TypedArray | DataView>,
  options?: writeFile.Options
): Task<void, FileError> {
  return Task(async ({ ok, error, setCanceler }) => {
    const controller = new AbortController();
    setCanceler(() => controller.abort());
    try {
      return ok(
        await Internal.FS.writeFile(file, data, {
          ...options,
          signal: controller.signal,
        })
      );
    } catch (error_: unknown) {
      return error(errnoExceptionHandler(error_));
    }
  });
}
export namespace writeFile {
  export type Options = {
    /**
     * The file encoding
     */
    encoding?: Option<BufferEncoding>;
    /**
     * The file mode
     */
    mode?: Option<nodeFS.Mode>;
    /**
     * The system flag used to determine if the file should be truncated
     */
    flag?: Option<nodeFS.OpenMode>;
  };
}
