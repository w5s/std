import type { Task } from '@w5s/core';
import type * as nodeFS from 'node:fs';
import { FileError } from '../error.js';
import { Internal, errnoTask } from '../internal.js';
import { FilePath } from '../filePath.js';

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
  return errnoTask(async (pathString: string, optionObject?: nodeFS.MakeDirectoryOptions) => {
    await Internal.FS.mkdir(pathString, optionObject);
  })(path, options);
}
export namespace createDirectory {
  export type Options = nodeFS.MakeDirectoryOptions;
}
