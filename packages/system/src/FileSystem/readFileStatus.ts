import type * as nodeFS from 'node:fs';
import type { Int } from '@w5s/core';
import type { Task } from '@w5s/task';
import type { Time } from '@w5s/time';
import type { FileError } from '../FileError.js';
import { Internal, errnoTask } from '../Internal.js';
import type { FilePath } from '../FilePath.js';
import type { DeviceID, FileID, GroupID, UserID } from '../FileStatus.js';
import { FileStatus } from '../FileStatus.js';
import type { FileSize } from '../FileSize.js';

function fileStatusFromNodeJSStats(stats: nodeFS.Stats): FileStatus {
  return FileStatus.create({
    accessTime: stats.atimeMs as Time,
    deviceID: stats.dev as DeviceID,
    fileGroup: stats.gid as GroupID,
    fileID: stats.ino as FileID,
    fileOwner: stats.uid as UserID,
    fileSize: stats.size as FileSize,
    isBlockDevice: stats.isBlockDevice(),
    isCharacterDevice: stats.isCharacterDevice(),
    isDirectory: stats.isDirectory(),
    isFile: stats.isFile(),
    isNamedPipe: stats.isFIFO(),
    isSocket: stats.isSocket(),
    isSymbolicLink: stats.isSymbolicLink(),
    linkCount: stats.nlink as Int,
    modificationTime: stats.mtimeMs as Time,
    specialDeviceID: stats.rdev as DeviceID,
    statusChangeTime: stats.ctimeMs as Time,
    // fileMode: FileMode(stats.mode),
  });
}

/**
 * Returns a `FileStatus` object for the given `filePath`, if `filePath` refers to a symbolic link it returns the status of the link target.
 *
 * @example
 * ```typescript
 * const task = FileSystem.readFileStatus(FilePath('/etc/passwd'));
 * const fileStatus = await Task.run(task);// Result.Ok({ isFile: true, ... })
 * ```
 * @param filePath - The path to the file
 */
export function readFileStatus(filePath: FilePath): Task<FileStatus, FileError> {
  return errnoTask(async (p: string) => fileStatusFromNodeJSStats(await Internal.FS.stat(p)))(filePath);
}

/**
 * Returns a `FileStatus` object for the given `filePath`, if `filePath` refers to a symbolic link it returns the status of the link.
 *
 * @example
 * ```typescript
 * const task = FileSystem.readSymbolicLinkStatus(FilePath('/etc/passwd'));
 * const fileStatus = await Task.run(task);// Result.Ok({ isFile: true, ... })
 * ```
 * @param filePath - The path to the file
 */
export function readSymbolicLinkStatus(filePath: FilePath): Task<FileStatus, FileError> {
  return errnoTask(async (p: string) => fileStatusFromNodeJSStats(await Internal.FS.lstat(p)))(filePath);
}
