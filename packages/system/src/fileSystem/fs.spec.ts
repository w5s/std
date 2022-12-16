import { Result, Task } from '@w5s/core';
import { describe, it, expect, jest } from '@jest/globals';
import {
  copyFile,
  rename,
  listDirectory,
  createDirectory,
  writeFile,
  createSymbolicLink,
  readSymbolicLink,
} from './fs.js';
import { FilePath } from '../filePath.js';
import { expectTask } from '../_test/config.js';
import { Internal } from '../internal.js';

describe(copyFile, () => {
  it('should call fs.promises.rename', async () => {
    const copyFileMocked = jest.spyOn(Internal.FS, 'copyFile').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('oldPath'), FilePath('newPath')] as const;
    const task = copyFile(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(undefined));
    expect(copyFileMocked).toHaveBeenCalledWith(...args);
  });
});
describe(createDirectory, () => {
  it('should call fs.promises.mkdir', async () => {
    const mkdirMocked = jest.spyOn(Internal.FS, 'mkdir').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('anyPath'), { recursive: true }] as const;
    const task = createDirectory(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(undefined));
    expect(mkdirMocked).toHaveBeenCalledWith(...args);
  });
});
describe(listDirectory, () => {
  it('should call fs.promises.readdir', async () => {
    const readdirMocked = jest
      .spyOn(Internal.FS, 'readdir')
      .mockImplementation(() => Promise.resolve(['file1', 'file2'] as any));
    const args = [FilePath('anyPath'), 'utf8'] as const;
    const task = listDirectory(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(['file1', 'file2']));
    expect(readdirMocked).toHaveBeenCalledWith(...args);
  });
});
describe(rename, () => {
  it('should call fs.promises.rename', async () => {
    const renameMocked = jest.spyOn(Internal.FS, 'rename').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('oldPath'), FilePath('newPath')] as const;
    const task = rename(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(undefined));
    expect(renameMocked).toHaveBeenCalledWith(...args);
  });
});
describe(writeFile, () => {
  it('should call fs.promises.writeFile', async () => {
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
  it('should be cancelable', async () => {
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
    task.taskRun(
      () => {},
      () => {},
      cancelerRef
    );
    expect(fileContent).toEqual('0123456789');
  });
});

describe(createSymbolicLink, () => {
  it('should call fs.promises.symlink', async () => {
    const symlinkMocked = jest.spyOn(Internal.FS, 'symlink').mockImplementation(() => Promise.resolve(undefined));
    const args = [FilePath('target'), FilePath('path')] as const;
    const task = createSymbolicLink(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(undefined));
    expect(symlinkMocked).toHaveBeenCalledWith(...args);
  });
});

describe(readSymbolicLink, () => {
  it('should call fs.promises.readLink', async () => {
    const readLinkMocked = jest
      .spyOn(Internal.FS, 'readlink')
      .mockImplementation(() => Promise.resolve(FilePath('path')));
    const args = [FilePath('target'), { encoding: 'utf8' }] as const;
    const task = readSymbolicLink(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(FilePath('path')));
    expect(readLinkMocked).toHaveBeenCalledWith(...args);
  });
});
