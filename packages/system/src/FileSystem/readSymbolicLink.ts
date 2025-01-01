import type { Option } from '@w5s/core';
import type { Task } from '@w5s/task';
import type { FileError } from '../FileError.js';
import { Internal, errnoTask } from '../Internal.js';
import type { FilePath } from '../FilePath.js';

/**
 * Reads the contents of the symbolic link referred to by path.
 *
 * @example
 * ```typescript
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
