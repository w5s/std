import { Option } from '@w5s/core';
import * as nodeFS from 'node:fs';
import { errnoExceptionHandler, FileError } from './error';
import { FilePath } from './path';
import { ErrnoException } from './nodejs.js';

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
    expect(errnoExceptionHandler(anyPath)('anything')).toEqual(
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
    expect(errnoExceptionHandler(anyPath)(anyErrnoException)).toEqual(
      FileError({
        fileErrorType: 'OtherError',
        path: anyPath,
        cause: anyErrnoException,
        syscall: anyErrnoException.syscall,
        errno: anyErrnoException.errno,
        code: anyErrnoException.code,
      })
    );
  });
});
