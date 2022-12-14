import { Task, Array, ignore, Option } from '@w5s/core';
import type * as nodeFS from 'node:fs';
import { FileError } from '../error.js';
import { Internal, errnoTask, errnoExceptionHandler } from '../internal.js';
import { FilePath } from '../filePath.js';

/**
 * Reads the contents of a directory.
 *
 * @example
 * ```ts
 * const task = listDirectory(FilePath('/path/to/directory'));
 * const list = await Task.unsafeRun(task); // Result.Ok([FilePath('file1'), FilePath('file2')])
 * ```
 * @param filePath - The path to the directory.
 * @param options - The options to use.
 */
export function listDirectory(filePath: FilePath, options?: listDirectory.Options): Task<Array<FilePath>, FileError> {
  // @ts-ignore - `readdir` returns an array of strings instead of a Array<FilePath>
  return errnoTask<[path: nodeFS.PathLike, options?: BufferEncoding], string[]>(Internal.FS.readdir)(filePath, options);
}
export namespace listDirectory {
  export type Options = BufferEncoding;
}

/**
 * Asynchronously creates a directory.
 *
 * @example
 * ```ts
 * const task = createDirectory(FilePath('/path/to/directory'));
 * await Task.unsafeRun(task); // Will create the directory
 * ```
 * @param path - The path to the directory.
 * @param options - The options to use.
 */
export function createDirectory(path: FilePath, options?: createDirectory.Options): Task<void, FileError> {
  return Task.map(errnoTask(Internal.FS.mkdir)(path, options), ignore);
}
export namespace createDirectory {
  export type Options = nodeFS.MakeDirectoryOptions;
}

/**
 * Reads the contents of the symbolic link referred to by path.
 *
 * @example
 * ```ts
 * const task = createSymbolicLink(FilePath('/path/to/symlink'), FilePath('/path/to/base_file'));
 * await Task.unsafeRun(task); // Will create the symlink
 * ```
 * @param source - The path to the base file or directory.
 * @param destination - The path to the symbolic link.
 */
export function createSymbolicLink(source: FilePath, destination: FilePath): Task<void, FileError> {
  return errnoTask(Internal.FS.symlink)(source, destination);
}

/**
 * Reads the contents of the symbolic link referred to by path.
 *
 * @example
 * ```ts
 * const task = readSymbolicLink(FilePath('/path/to/symlink'));
 * await Task.unsafeRun(task); // Result.Ok(FilePath('...'))
 * ```
 * @param path - The path to the file.
 * @param options - The options to use.
 */
export function readSymbolicLink(path: FilePath, options?: readSymbolicLink.Options): Task<FilePath, FileError> {
  return errnoTask(Internal.FS.readlink)(path, options) as Task<FilePath, FileError>;
}
export namespace readSymbolicLink {
  export type Options = {
    /**
     * The file encoding
     */
    encoding?: Option<BufferEncoding>;
  };
}

/**
 * Asynchronously copies `source` to `destination`. By default, `destination` is overwritten if it already exists.
 *
 * @example
 * ```ts
 * const task = copyFile(FilePath('/path/to/source'), FilePath('/path/to/destination'));
 * await Task.unsafeRun(task); // Will copy the file
 * ```
 * @param source - The source path.
 * @param destination - The destination path.
 */
export function copyFile(source: FilePath, destination: FilePath): Task<void, FileError> {
  return errnoTask(Internal.FS.copyFile)(source, destination);
}

/**
 * Renames `oldPath` to `newPath`.
 *
 * @example
 * ```ts
 * const task = rename(FilePath('/path/to/old'), FilePath('/path/to/new'));
 * await Task.unsafeRun(task); // Will rename the file
 * ```
 * @param oldPath - The path to the file to be renamed.
 * @param newPath - The path to the new file.
 */
export function rename(oldPath: FilePath, newPath: FilePath): Task<void, FileError> {
  return errnoTask(Internal.FS.rename)(oldPath, newPath);
}

/**
 * Removes files and directories (modeled on the standard POSIX `rm` utility).
 *
 * @example
 * ```ts
 * const task = remove(FilePath('/path/to/file.txt'));
 * Task.unsafeRun(task);
 * ```
 * @param filePath - The path to the file to be removed.
 * @param options - The options to be used when removing the file.
 */
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
 * @param file - Path to the file to be read.
 * @param data - The buffer that the data will be appended to.
 * @param options - An object of write options
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

export function _exists(filePath: FilePath): Task<boolean, FileError> {
  return errnoTask(async (path: string) => {
    try {
      await Internal.FS.access(path, Internal.FS.F_OK);
      return true;
    } catch {
      return false;
    }
  })(filePath);
}
