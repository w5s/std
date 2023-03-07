import type { Task } from '@w5s/core';
import type { FileError } from '../error.js';
import { Internal, errnoTask } from '../internal.js';
import type { FilePath } from '../filePath.js';

/**
 * Asynchronously copies `source` to `destination`. By default, `destination` is overwritten if it already exists.
 *
 * @example
 * ```ts
 * const task = copyFile(FilePath('/path/to/source'), FilePath('/path/to/destination'));
 * await unsafeRun(task); // Will copy the file
 * ```
 * @param source - The source path.
 * @param destination - The destination path.
 */
export function copyFile(source: FilePath, destination: FilePath): Task<void, FileError> {
  return errnoTask(Internal.FS.copyFile)(source, destination);
}
