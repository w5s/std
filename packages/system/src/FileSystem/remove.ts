import type * as nodeFS from 'node:fs';
import type { Task } from '@w5s/task';
import type { FileError } from '../FileError.js';
import { Internal, errnoTask } from '../Internal.js';
import type { FilePath } from '../FilePath.js';

/**
 * Removes files and directories (modeled on the standard POSIX `rm` utility).
 *
 * @example
 * ```typescript
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
