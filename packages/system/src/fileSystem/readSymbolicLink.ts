import type { Task, Option } from '@w5s/core';
import { FileError } from '../error.js';
import { Internal, errnoTask } from '../internal.js';
import { FilePath } from '../filePath.js';

/**
 * Reads the contents of the symbolic link referred to by path.
 *
 * @example
 * ```ts
 * const task = readSymbolicLink(FilePath('/path/to/symlink'));
 * await Task.unsafeRun(task); // Result.Ok(FilePath('...'))
 * ```
 * @param path - The path to the file.
 * @param options - The options to use.
 */
export function readSymbolicLink(path: FilePath, options?: readSymbolicLink.Options): Task<FilePath, FileError> {
  return errnoTask(Internal.FS.readlink)(path, options) as Task<FilePath, FileError>;
}
export namespace readSymbolicLink {
  export type Options = {
    /**
     * The file encoding
     */
    encoding?: Option<BufferEncoding>;
  };
}
