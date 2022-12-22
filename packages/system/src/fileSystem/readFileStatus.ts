import type { Task } from '@w5s/core';
import type { FileError } from '../error.js';
import { Internal, errnoTask } from '../internal.js';
import { FilePath } from '../filePath.js';
import { FileStatus } from '../fileStatus.js';

/**
 * Returns a `FileStatus` object for the given `filePath`, if `filePath` refers to a symbolic link it returns the status of the link target.
 *
 * @example
 * ```ts
 * const task = FileSystem.readFileStatus(FilePath('/etc/passwd'));
 * const fileStatus = await Task.unsafeRun(task);// Result.Ok({ isFile: true, ... })
 * ```
 * @param filePath - The path to the file
 */
export function readFileStatus(filePath: FilePath): Task<FileStatus, FileError> {
  return errnoTask(async (p: string) => FileStatus.fromNodeJSStats(await Internal.FS.stat(p)))(filePath);
}

/**
 * Returns a `FileStatus` object for the given `filePath`, if `filePath` refers to a symbolic link it returns the status of the link.
 *
 * @example
 * ```ts
 * const task = FileSystem.readSymbolicLinkStatus(FilePath('/etc/passwd'));
 * const fileStatus = await Task.unsafeRun(task);// Result.Ok({ isFile: true, ... })
 * ```
 * @param filePath - The path to the file
 */
export function readSymbolicLinkStatus(filePath: FilePath): Task<FileStatus, FileError> {
  return errnoTask(async (p: string) => FileStatus.fromNodeJSStats(await Internal.FS.lstat(p)))(filePath);
}
