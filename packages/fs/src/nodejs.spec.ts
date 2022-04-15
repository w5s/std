import { Option } from '@w5s/core';
import * as nodeFS from 'node:fs';
import { FileError } from './error.js';
import { ErrnoException, errnoExceptionHandler } from './nodejs.js';
import { FilePath } from './path.js';

describe('ErrnoException', () => {
  const anyError = new Error('AnyError');
  const anyErrnoException = (() => {
    try {
      nodeFS.lstatSync('non-existent-file');
      return undefined as never;
    } catch (error: unknown) {
      return error as ErrnoException;
    }
  })();

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
  const anyPath = 'anyPath' as FilePath;
  const anyErrnoException = (() => {
    try {
      nodeFS.lstatSync('non-existent-file');
      return undefined as never;
    } catch (error: unknown) {
      return error as ErrnoException;
    }
  })();

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
