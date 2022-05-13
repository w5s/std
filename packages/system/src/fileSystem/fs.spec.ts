import { Option, Result } from '@w5s/core';
import * as nodeFS from 'node:fs';
import { FileError } from '../error.js';
import { ErrnoException, errnoExceptionHandler, taskCreator, copyFile, remove, rename, listDirectory } from './fs.js';
import { FilePath } from '../path.js';
import { expectTask } from '../_test/config.js';
import { Internal } from '../internal.js';

const anyPath = 'anyPath' as FilePath;
const anyError = new Error('AnyError');
const anyErrnoException = (() => {
  try {
    nodeFS.lstatSync('non-existent-file');
    return undefined as never;
  } catch (error: unknown) {
    return error as ErrnoException;
  }
})();
describe('ErrnoException', () => {
  describe(ErrnoException.hasInstance, () => {
    test('should return true for ErrnoException', () => {
      expect(ErrnoException.hasInstance(anyErrnoException)).toBe(true);
      expect(ErrnoException.hasInstance(anyError)).toBe(true);
    });

    test('should return false for ErrnoException', () => {
      expect(ErrnoException.hasInstance({})).toBe(false);
      expect(ErrnoException.hasInstance(undefined)).toBe(false);
    });
  });
});
describe(errnoExceptionHandler, () => {
  test('should convert anything to "OtherError"', () => {
    expect(errnoExceptionHandler('anything')).toEqual(
      FileError({
        fileErrorType: 'OtherError',
        path: anyPath,
        cause: 'anything',
        syscall: Option.None,
        errno: Option.None,
        code: Option.None,
      })
    );
  });
  test('should convert any ErrnoException to "OtherError" and forward properties', () => {
    expect(errnoExceptionHandler(anyErrnoException)).toEqual(
      FileError({
        fileErrorType: 'OtherError',
        path: anyErrnoException.path as FilePath,
        cause: anyErrnoException,
        syscall: anyErrnoException.syscall,
        errno: anyErrnoException.errno,
        code: anyErrnoException.code,
      })
    );
  });
});

describe(taskCreator, () => {
  test('should transform return value', async () => {
    const original = async () => true;
    const transformed = taskCreator(original);

    await expectTask(transformed()).resolves.toEqual(Result.Ok(true));
  });
  test('should transform thrown error with errnoExceptionHandler', async () => {
    const original = async () => {
      throw anyError;
    };
    const transformed = taskCreator(original);

    await expectTask(transformed()).resolves.toEqual(Result.Error(errnoExceptionHandler(anyError)));
  });
});
describe(copyFile, () => {
  test('should call fs.promises.rename', async () => {
    const copyFileMocked = jest.spyOn(Internal.FS, 'copyFile').mockImplementation(
      () =>
        // do nothing
        undefined as never
    );
    const args = [FilePath('oldPath'), FilePath('newPath')] as const;
    const task = copyFile(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(undefined));
    expect(copyFileMocked).toHaveBeenCalledWith(...args);
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
    const removeMocked = jest.spyOn(Internal.FS, 'rm').mockImplementation(
      () =>
        // do nothing
        undefined as never
    );
    const args = [FilePath('anyPath'), { recursive: true }] as const;
    const task = remove(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(undefined));
    expect(removeMocked).toHaveBeenCalledWith(...args);
  });
});
describe(rename, () => {
  test('should call fs.promises.rename', async () => {
    const renameMocked = jest.spyOn(Internal.FS, 'rename').mockImplementation(
      () =>
        // do nothing
        undefined as never
    );
    const args = [FilePath('oldPath'), FilePath('newPath')] as const;
    const task = rename(...args);
    await expectTask(task).resolves.toEqual(Result.Ok(undefined));
    expect(renameMocked).toHaveBeenCalledWith(...args);
  });
});
