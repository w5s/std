import { Task } from '@w5s/core';
import type * as nodeFS from 'node:fs';
import { FileError } from '../error.js';
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
  return Task.map(
    errnoTask(Internal.FS.stat as (p: string) => Promise<nodeFS.Stats>)(filePath),
    FileStatus.fromNodeJSStats
  );
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
  return Task.map(
    errnoTask(Internal.FS.lstat as (p: string) => Promise<nodeFS.Stats>)(filePath),
    FileStatus.fromNodeJSStats
  );
}
