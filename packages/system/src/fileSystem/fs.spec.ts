import { Result } from '@w5s/core';
import { copyFile, remove, rename, listDirectory, createDirectory } from './fs.js';
import { FilePath } from '../path.js';
import { expectTask } from '../_test/config.js';
import { Internal } from '../internal.js';

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
