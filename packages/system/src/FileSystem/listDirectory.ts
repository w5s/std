import type * as nodeFS from 'node:fs';
import type { Array } from '@w5s/core-type';
import type { Task } from '@w5s/task';
import type { FileError } from '../FileError.js';
import { Internal, errnoTask } from '../Internal.js';
import type { FilePath } from '../FilePath.js';

/**
 * Reads the contents of a directory.
 *
 * @example
 * ```typescript
 * const task = listDirectory(FilePath('/path/to/directory'));
 * const list = await Task.run(task); // Result.Ok([FilePath('file1'), FilePath('file2')])
 * ```
 * @param filePath - The path to the directory.
 * @param options - The options to use.
 */
export function listDirectory(filePath: FilePath, options?: listDirectory.Options): Task<Array<FilePath>, FileError> {
  // @ts-ignore - `readdir` returns an array of strings instead of a Array<FilePath>
  return errnoTask<[path: nodeFS.PathLike, options?: BufferEncoding], string[]>(Internal.FS.readdir)(filePath, options);
}
export namespace listDirectory {
  export type Options = BufferEncoding;
}
