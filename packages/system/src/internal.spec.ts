import { Option, Result } from '@w5s/core';
import { FileError } from './error';
import { ErrnoException, errnoExceptionHandler, errnoTask, errnoTaskSync } from './internal';
import { FilePath } from './filePath';
import { anyErrnoException, anyError, anyPath, expectTask } from './_test/config';

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
describe(errnoTask, () => {
  test('should transform return value', async () => {
    const original = async () => true;
    const transformed = errnoTask(original);

    await expectTask(transformed()).resolves.toEqual(Result.Ok(true));
  });
  test('should transform thrown error with errnoExceptionHandler', async () => {
    const original = async () => {
      throw anyError;
    };
    const transformed = errnoTask(original);

    await expectTask(transformed()).resolves.toEqual(Result.Error(errnoExceptionHandler(anyError)));
  });
});
describe(errnoTaskSync, () => {
  test('should transform return value', () => {
    const original = () => true;
    const transformed = errnoTaskSync(original);

    expectTask(transformed()).result.toEqual(Result.Ok(true));
  });
  test('should transform thrown error with errnoExceptionHandler', () => {
    const original = () => {
      throw anyError;
    };
    const transformed = errnoTaskSync(original);

    expectTask(transformed()).result.toEqual(Result.Error(errnoExceptionHandler(anyError)));
  });
});
