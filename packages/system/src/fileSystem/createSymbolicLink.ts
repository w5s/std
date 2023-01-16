import type { Task } from '@w5s/core';
import type { FileError } from '../error.js';
import { Internal, errnoTask } from '../internal.js';
import type { FilePath } from '../filePath.js';

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
