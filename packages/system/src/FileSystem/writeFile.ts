import type * as nodeFS from 'node:fs';
import type { Option } from '@w5s/core';
import type { Task } from '@w5s/task';
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import type { FileError } from '../FileError.js';
import { Internal, errnoExceptionHandler } from '../Internal.js';
import type { FilePath } from '../FilePath.js';

/**
 * Asynchronously writes data to a file, replacing the file if it already exists.
 *
 * @example
 * ```typescript
 * const write = writeFile(FilePath('my/file'), 'my content');
 * Task.run(write);
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
  options?: writeFile.Options,
): Task<void, FileError> {
  return taskFrom(async ({ resolve, reject, canceler }) => {
    const controller = new AbortController();
    canceler.onCancel = () => {
      controller.abort();
    };
    try {
      resolve(
        await Internal.FS.writeFile(file, data, {
          ...options,
          signal: controller.signal,
        }),
      );
    } catch (error_: unknown) {
      reject(errnoExceptionHandler(error_));
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
