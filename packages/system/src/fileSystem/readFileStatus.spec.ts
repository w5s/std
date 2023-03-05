import { Int, Result, Time } from '@w5s/core';
import { describe, it, expect, vi } from 'vitest';
import { readFileStatus, readSymbolicLinkStatus } from './readFileStatus.js';
import { FilePath } from '../filePath.js';
import { expectTask, generateStats } from '../_test/config.js';
import { Internal } from '../internal.js';
import { DeviceID, FileID, FileStatus, GroupID, UserID } from '../fileStatus.js';
import { FileSize } from '../fileSize.js';

describe('readFileStatus', () => {
  it('should convert fs.Stat to FileStatus', async () => {
    const stats = generateStats();
    const statMocked = vi.spyOn(Internal.FS, 'stat').mockImplementation(() => Promise.resolve(stats));
    const args = [FilePath('path')] as const;
    const task = readFileStatus(...args);
    await expectTask(task).result.resolves.toEqual(
      Result.Ok(
        FileStatus({
          accessTime: Time(stats.atimeMs),
          deviceID: DeviceID(stats.dev),
          fileGroup: GroupID(stats.gid),
          fileID: FileID(stats.ino),
          fileOwner: UserID(stats.uid),
          fileSize: FileSize(stats.size),
          isBlockDevice: stats.isBlockDevice(),
          isCharacterDevice: stats.isCharacterDevice(),
          isDirectory: stats.isDirectory(),
          isFile: stats.isFile(),
          isNamedPipe: stats.isFIFO(),
          isSocket: stats.isSocket(),
          isSymbolicLink: stats.isSymbolicLink(),
          linkCount: Int(stats.nlink),
          modificationTime: Time(stats.mtimeMs),
          specialDeviceID: DeviceID(stats.rdev),
          statusChangeTime: Time(stats.ctimeMs),
        })
      )
    );
    expect(statMocked).toHaveBeenCalledWith(...args);
  });
});
describe('readSymbolicLinkStatus', () => {
  it('should convert fs.Stat to FileStatus', async () => {
    const stats = generateStats();
    const lstatMocked = vi.spyOn(Internal.FS, 'lstat').mockImplementation(() => Promise.resolve(stats));
    const args = [FilePath('path')] as const;
    const task = readSymbolicLinkStatus(...args);
    await expectTask(task).result.resolves.toEqual(
      Result.Ok(
        FileStatus({
          accessTime: Time(stats.atimeMs),
          deviceID: DeviceID(stats.dev),
          fileGroup: GroupID(stats.gid),
          fileID: FileID(stats.ino),
          fileOwner: UserID(stats.uid),
          fileSize: FileSize(stats.size),
          isBlockDevice: stats.isBlockDevice(),
          isCharacterDevice: stats.isCharacterDevice(),
          isDirectory: stats.isDirectory(),
          isFile: stats.isFile(),
          isNamedPipe: stats.isFIFO(),
          isSocket: stats.isSocket(),
          isSymbolicLink: stats.isSymbolicLink(),
          linkCount: Int(stats.nlink),
          modificationTime: Time(stats.mtimeMs),
          specialDeviceID: DeviceID(stats.rdev),
          statusChangeTime: Time(stats.ctimeMs),
        })
      )
    );
    expect(lstatMocked).toHaveBeenCalledWith(...args);
  });
});
