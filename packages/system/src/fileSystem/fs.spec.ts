import { Result, Task } from '@w5s/core';
import * as nodeFS from 'node:fs';
import {
  copyFile,
  remove,
  rename,
  listDirectory,
  createDirectory,
  writeFile,
  readSymbolicLinkStatus,
  readFileStatus,
} from './fs.js';
import { FilePath } from '../filePath.js';
import { expectTask } from '../_test/config.js';
import { Internal } from '../internal.js';

const randomBoolean = () => Math.random() >= 0.5;
const randomInt = () => Math.floor(Math.random() * 10_000_000_000);
const randomDate = () => new Date(Math.floor(Math.random() * 10_000_000_000));
const generateStats = (): nodeFS.Stats => {
  const isFile = randomBoolean();
  const isDirectory = randomBoolean();
  const isSymbolicLink = randomBoolean();
  const isBlockDevice = randomBoolean();
  const isCharacterDevice = randomBoolean();
  const isFIFO = randomBoolean();
  const isSocket = randomBoolean();
  return {
    isFile: () => isFile,
    isDirectory: () => isDirectory,
    isSymbolicLink: () => isSymbolicLink,
    isBlockDevice: () => isBlockDevice,
    isCharacterDevice: () => isCharacterDevice,
    isFIFO: () => isFIFO,
    isSocket: () => isSocket,
    size: 0,
    atime: randomDate(),
    get atimeMs() {
      return this.atime.getTime();
    },
    // atimeNs: Math.random(),
    mtime: randomDate(),
    get mtimeMs() {
      return this.mtime.getTime();
    },
    // mtimeNs: Math.random(),
    ctime: randomDate(),
    get ctimeMs() {
      return this.ctime.getTime();
    },
    // ctimeNs: Math.random(),
    birthtime: randomDate(),
    get birthtimeMs() {
      return this.birthtime.getTime();
    },
    // birthtimeNs: Math.random(),
    dev: randomInt(),
    ino: randomInt(),
    mode: randomInt(),
    nlink: randomInt(),
    uid: randomInt(),
    gid: randomInt(),
    rdev: randomInt(),
    blksize: randomInt(),
    blocks: randomInt(),
  };
};

describe(copyFile, () => {
  test('should call fs.promises.rename', async () => {
    const copyFileMocked = jest.spyOn(Internal.FS, 'copyFile').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('oldPath'), FilePath('newPath')] as const;
    const task = copyFile(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(undefined));
    expect(copyFileMocked).toHaveBeenCalledWith(...args);
  });
});
describe(createDirectory, () => {
  test('should call fs.promises.mkdir', async () => {
    const mkdirMocked = jest.spyOn(Internal.FS, 'mkdir').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('anyPath'), { recursive: true }] as const;
    const task = createDirectory(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(undefined));
    expect(mkdirMocked).toHaveBeenCalledWith(...args);
  });
});
describe(listDirectory, () => {
  test('should call fs.promises.readdir', async () => {
    const readdirMocked = jest
      .spyOn(Internal.FS, 'readdir')
      .mockImplementation(() => Promise.resolve(['file1', 'file2'] as any));
    const args = [FilePath('anyPath'), 'utf8'] as const;
    const task = listDirectory(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(['file1', 'file2']));
    expect(readdirMocked).toHaveBeenCalledWith(...args);
  });
});
describe(remove, () => {
  test('should call fs.promises.rm', async () => {
    const removeMocked = jest.spyOn(Internal.FS, 'rm').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('anyPath'), { recursive: true }] as const;
    const task = remove(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(undefined));
    expect(removeMocked).toHaveBeenCalledWith(...args);
  });
});
describe(rename, () => {
  test('should call fs.promises.rename', async () => {
    const renameMocked = jest.spyOn(Internal.FS, 'rename').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('oldPath'), FilePath('newPath')] as const;
    const task = rename(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(undefined));
    expect(renameMocked).toHaveBeenCalledWith(...args);
  });
});
describe(writeFile, () => {
  test('should call fs.promises.writeFile', async () => {
    const writeFileMocked = jest.spyOn(Internal.FS, 'writeFile').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('oldPath'), '', { encoding: 'utf8' }] as const;
    const task = writeFile(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(undefined));
    expect(writeFileMocked).toHaveBeenCalledWith(
      FilePath('oldPath'),
      '',
      expect.objectContaining({ encoding: 'utf8' })
    );
  });
  test('should be cancelable', async () => {
    let fileContent = '';
    jest.spyOn(Internal.FS, 'writeFile').mockImplementation(async (_file, content: any, options: any) => {
      for (const contentChar of content) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (options.signal.aborted) {
          return;
        }
        fileContent += contentChar;
      }
    });
    let index = 0;
    const cancelerRef = { current: Task.defaultCanceler };
    const content: Iterable<string> = {
      [Symbol.iterator]: () => ({
        next: () => {
          const currentIndex = index;
          index += 1;
          let value = currentIndex.toString(16);
          if (currentIndex > 9) {
            cancelerRef.current();
            value = 'X';
          }
          if (currentIndex >= 16) {
            return { done: true, value };
          }
          return {
            done: false,
            value,
          };
        },
      }),
    };
    const task = writeFile(FilePath('oldPath'), content);
    task[Task.run](
      () => {},
      () => {},
      cancelerRef
    );
    expect(fileContent).toEqual('0123456789');
  });
});
describe(readSymbolicLinkStatus, () => {
  test('should convert fs.Stat to FileStatus', async () => {
    const stats = generateStats();
    const lstatMocked = jest.spyOn(Internal.FS, 'lstat').mockImplementation(() => Promise.resolve(stats));
    const args = [FilePath('path')] as const;
    const task = readSymbolicLinkStatus(...args);
    await expectTask(task).resolves.toEqual(
      Result.Ok({
        accessTime: stats.atimeMs,
        deviceID: stats.dev,
        fileGroup: stats.gid,
        fileID: stats.ino,
        fileOwner: stats.uid,
        fileSize: stats.size,
        isBlockDevice: stats.isBlockDevice(),
        isCharacterDevice: stats.isCharacterDevice(),
        isDirectory: stats.isDirectory(),
        isFile: stats.isFile(),
        isNamedPipe: stats.isFIFO(),
        isSocket: stats.isSocket(),
        isSymbolicLink: stats.isSymbolicLink(),
        linkCount: stats.nlink,
        modificationTime: stats.mtimeMs,
        specialDeviceID: stats.rdev,
        statusChangeTime: stats.ctimeMs,
      })
    );
    expect(lstatMocked).toHaveBeenCalledWith(...args);
  });
});

describe(readFileStatus, () => {
  test('should convert fs.Stat to FileStatus', async () => {
    const stats = generateStats();
    const statMocked = jest.spyOn(Internal.FS, 'stat').mockImplementation(() => Promise.resolve(stats));
    const args = [FilePath('path')] as const;
    const task = readFileStatus(...args);
    await expectTask(task).resolves.toEqual(
      Result.Ok({
        accessTime: stats.atimeMs,
        deviceID: stats.dev,
        fileGroup: stats.gid,
        fileID: stats.ino,
        fileOwner: stats.uid,
        fileSize: stats.size,
        isBlockDevice: stats.isBlockDevice(),
        isCharacterDevice: stats.isCharacterDevice(),
        isDirectory: stats.isDirectory(),
        isFile: stats.isFile(),
        isNamedPipe: stats.isFIFO(),
        isSocket: stats.isSocket(),
        isSymbolicLink: stats.isSymbolicLink(),
        linkCount: stats.nlink,
        modificationTime: stats.mtimeMs,
        specialDeviceID: stats.rdev,
        statusChangeTime: stats.ctimeMs,
      })
    );
    expect(statMocked).toHaveBeenCalledWith(...args);
  });
});
