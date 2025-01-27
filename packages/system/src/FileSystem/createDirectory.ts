import type * as nodeFS from 'node:fs';
import type { Task } from '@w5s/task';
import type { FileError } from '../FileError.js';
import { Internal, errnoTask } from '../Internal.js';
import type { FilePath } from '../FilePath.js';

/**
 * Asynchronously creates a directory.
 *
 * @example
 * ```typescript
 * const task = createDirectory(FilePath('/path/to/directory'));
 * await Task.run(task); // Will create the directory
 * ```
 * @param path - The path to the directory.
 * @param options - The options to use.
 */
export function createDirectory(path: FilePath, options?: createDirectory.Options): Task<void, FileError> {
  return errnoTask(async (pathString: string, optionObject?: nodeFS.MakeDirectoryOptions) => {
    await Internal.FS.mkdir(pathString, optionObject);
  })(path, options);
}
export namespace createDirectory {
  export type Options = nodeFS.MakeDirectoryOptions;
}
