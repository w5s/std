import type { Option } from '@w5s/core';
import type { Task } from '@w5s/task';
import type * as nodeFS from 'node:fs';

import { from as taskFrom } from '@w5s/task/dist/Task/from.js';

import type { FileError } from '../FileError.js';
import type { FilePath } from '../FilePath.js';

import { errnoExceptionHandler, Internal } from '../Internal.js';

/**
 * Asynchronously reads the entire contents of a file.
 *
 * @example
 * ```typescript
 * const task = readFile(FilePath('my/file'), { encoding: 'utf8' });
 * const result = await Task.run(task);
 * ```
 * @param file Path to the file to be read.
 * @param options An object of read options
 */
export function readFile(
  file: FilePath,
  options?: readFile.Options,
): Task<string | Uint8Array, FileError> {
  return taskFrom(async ({ canceler, reject, resolve }) => {
    const controller = new AbortController();
    canceler.onCancel = () => {
      controller.abort();
    };
    try {
      resolve(
        await Internal.FS.readFile(file, {
          ...options,
          signal: controller.signal,
        }),
      );
    } catch (error_: unknown) {
      reject(errnoExceptionHandler(error_));
    }
  });
}
export namespace readFile {
  export interface Options {
    /**
     * The file encoding
     */
    encoding?: Option<BufferEncoding>;

    /**
     * The system flag used to determine if the file should be truncated
     */
    flag?: Option<nodeFS.OpenMode>;
  }
}
