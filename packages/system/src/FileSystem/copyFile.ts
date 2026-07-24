import type { Task } from '@w5s/task';

import type { FileError } from '../FileError.js';
import type { FilePath } from '../FilePath.js';

import { errnoTask, Internal } from '../Internal.js';

/**
 * Asynchronously copies `source` to `destination`. By default, `destination` is overwritten if it already exists.
 *
 * @example
 * ```typescript
 * const task = copyFile(FilePath('/path/to/source'), FilePath('/path/to/destination'));
 * await Task.run(task); // Will copy the file
 * ```
 * @param source The source path.
 * @param destination The destination path.
 */
export function copyFile(source: FilePath, destination: FilePath): Task<void, FileError> {
  return errnoTask(Internal.FS.copyFile)(source, destination);
}
