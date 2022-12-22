import type { Int, Tag, Time } from '@w5s/core';
import { DataObject } from '@w5s/core/lib/dataObject.js';
import type * as nodeFS from 'node:fs';
import type { FileSize } from './fileSize.js';

/**
 * Device identifier type
 */
export type DeviceID = Tag<Int, { deviceID: true }>;
/**
 * DeviceID constructor
 *
 * @example
 * ```typescript
 * const value = FileID(1);// 1
 * ```
 * @category Constructor
 * @param value - an initial numeric value
 */
export function DeviceID(value: number): DeviceID {
  return value as DeviceID;
}

/**
 * File identifier type
 */
export type FileID = Tag<Int, { fileID: true }>;
/**
 * FileID constructor
 *
 * @example
 * ```typescript
 * const value = FileID(1);// 1
 * ```
 * @category Constructor
 * @param value - an initial numeric value
 */
export function FileID(value: number): FileID {
  return value as FileID;
}

/**
 * User identifier type
 */
export type UserID = Tag<Int, { userID: true }>;
/**
 * UserID constructor
 *
 * @example
 * ```typescript
 * const value = UserID(1);// 1
 * ```
 * @category Constructor
 * @param value - an initial numeric value
 */
export function UserID(value: number): UserID {
  return value as UserID;
}

/**
 * Group identifier type
 */
export type GroupID = Tag<Int, { groupID: true }>;
/**
 * UserID constructor
 *
 * @example
 * ```typescript
 * const value = UserID(1);// 1
 * ```
 * @category Constructor
 * @param value - an initial numeric value
 */
export function GroupID(value: number): GroupID {
  return value as GroupID;
}

export interface FileStatus
  extends DataObject<{
    _: 'FileStatus';
    /**
     * The device identifier
     */
    deviceID: DeviceID;
    /**
     * The file identifier
     */
    fileID: FileID;
    // fileMode: FileMode;
    /**
     * The amount of links to the file
     */
    linkCount: Int;
    /**
     * The owner identifier of the file
     */
    fileOwner: UserID;
    /**
     * The group identifier of the file
     */
    fileGroup: GroupID;
    /**
     * The id of the special device
     */
    specialDeviceID: DeviceID;
    /**
     * The size of the file (in bytes)
     */
    fileSize: FileSize;
    /**
     * Time of last access
     */
    accessTime: Time;
    /**
     * Time of last modification.
     */
    modificationTime: Time;
    /**
     * Time of last status change (i.e. owner, group, link count, mode, etc.).
     */
    statusChangeTime: Time;
    /**
     * Checks if this file is a block device.
     */
    isBlockDevice: boolean;
    /**
     * Checks if this file is a character device.
     */
    isCharacterDevice: boolean;
    /**
     * Checks if this file is a named pipe device.
     */
    isNamedPipe: boolean;
    /**
     * Checks if this file is a regular file device.
     */
    isFile: boolean;
    /**
     * Checks if this file is a directory device.
     */
    isDirectory: boolean;
    /**
     * Checks if this file is a symbolic link device.
     */
    isSymbolicLink: boolean;
    /**
     * Checks if this file is a socket device.
     */
    isSocket: boolean;
  }> {}
/**
 * FileStatus constructor
 *
 * @category Constructor
 */
export const FileStatus = Object.assign(DataObject.Make<FileStatus>('FileStatus'), {
  /**
   * Returns a new FileStatus from a NodeJS Stats
   *
   * @example
   * @param stats
   */
  fromNodeJSStats: (stats: nodeFS.Stats): FileStatus => ({
    _: 'FileStatus',
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
  }),
});
