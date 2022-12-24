import type { Task, Array } from '@w5s/core';
import type * as nodeFS from 'node:fs';
import { FileError } from '../error.js';
import { Internal, errnoTask } from '../internal.js';
import { FilePath } from '../filePath.js';

/**
 * Reads the contents of a directory.
 *
 * @example
 * ```ts
 * const task = listDirectory(FilePath('/path/to/directory'));
 * const list = await Task.unsafeRun(task); // Result.Ok([FilePath('file1'), FilePath('file2')])
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
