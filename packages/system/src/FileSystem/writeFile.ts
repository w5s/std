import type { Option } from '@w5s/core';
import type { Task } from '@w5s/task';
import type * as nodeFS from 'node:fs';

import { from as taskFrom } from '@w5s/task/dist/Task/from.js';

import type { FileError } from '../FileError.js';
import type { FilePath } from '../FilePath.js';

import { errnoExceptionHandler, Internal } from '../Internal.js';

/**
 * Asynchronously writes data to a file, replacing the file if it already exists.
 *
 * @example
 * ```typescript
 * const write = writeFile(FilePath('my/file'), 'my content');
 * Task.run(write);
 * ```
 * @param file Path to the file to be read.
 * @param data The buffer that the data will be appended to.
 * @param options An object of write options
 */
export function writeFile(
  file: FilePath,
  data:
    | AsyncIterable<DataView | NodeJS.TypedArray | string>
    | DataView
    | Iterable<DataView | NodeJS.TypedArray | string>
    | NodeJS.TypedArray
    | string,
  options?: writeFile.Options,
): Task<void, FileError> {
  return taskFrom(async ({ canceler, reject, resolve }) => {
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
  export interface Options {
    /**
     * The file encoding
     */
    encoding?: Option<BufferEncoding>;

    /**
     * The system flag used to determine if the file should be truncated
     */
    flag?: Option<nodeFS.OpenMode>;

    /**
     * The file mode
     */
    mode?: Option<nodeFS.Mode>;
  }
}
