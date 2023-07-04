import type { Int, Tag, Time } from '@w5s/core';
import { DataObject } from '@w5s/core/dist/dataObject.js';
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
export const FileStatus = DataObject.Make<FileStatus>('FileStatus');
