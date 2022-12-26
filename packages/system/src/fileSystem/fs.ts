import { Task, Option } from '@w5s/core';
import type * as nodeFS from 'node:fs';
import { FileError } from '../error.js';
import { Internal, errnoTask, errnoExceptionHandler } from '../internal.js';
import { FilePath } from '../filePath.js';

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
