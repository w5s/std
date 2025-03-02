import { Option } from '@w5s/core';
import { describe, it, expect } from 'vitest';
import { withTask } from '@w5s/task/dist/Testing.js';
import { FileError } from './FileError.js';
import { ErrnoException, errnoExceptionHandler, errnoTask, errnoTaskSync } from './Internal.js';
import type { FilePath } from './FilePath.js';
import { anyErrnoException, anyError } from './_test/config.js';

const expectTask = withTask(expect);

describe('ErrnoException', () => {
  describe('.hasInstance', () => {
    it('should return true for ErrnoException', () => {
      expect(ErrnoException.hasInstance(anyErrnoException)).toBe(true);
      expect(ErrnoException.hasInstance(anyError)).toBe(true);
    });

    it('should return false for ErrnoException', () => {
      expect(ErrnoException.hasInstance({})).toBe(false);
      expect(ErrnoException.hasInstance(undefined)).toBe(false);
    });
  });
});
describe('errnoExceptionHandler', () => {
  it('should convert anything to "OtherError"', () => {
    expect(errnoExceptionHandler('anything')).toEqual(
      FileError({
        fileErrorType: 'OtherError',
        path: Option.None,
        cause: 'anything',
        syscall: Option.None,
        errno: Option.None,
        code: Option.None,
      }),
    );
  });
  it('should convert any ErrnoException to "OtherError" and forward properties', () => {
    expect(errnoExceptionHandler(anyErrnoException)).toEqual(
      FileError({
        fileErrorType: 'OtherError',
        path: anyErrnoException.path as FilePath,
        cause: anyErrnoException,
        syscall: anyErrnoException.syscall,
        errno: anyErrnoException.errno,
        code: anyErrnoException.code,
      }),
    );
  });
});
describe('errnoTask', () => {
  it('should transform return value', async () => {
    const original = async () => true;
    const transformed = errnoTask(original);

    const task = transformed();
    await expectTask(task).toResolveAsync(true);
  });
  it('should transform thrown error with errnoExceptionHandler', async () => {
    const original = async () => {
      throw anyError;
    };
    const transformed = errnoTask(original);

    const task = transformed();
    await expectTask(task).toRejectAsync(errnoExceptionHandler(anyError));
  });
});
describe('errnoTaskSync', () => {
  it('should transform return value', () => {
    const original = () => true;
    const transformed = errnoTaskSync(original);

    const task = transformed();
    expectTask(task).toResolveSync(true);
  });
  it('should transform thrown error with errnoExceptionHandler', () => {
    const original = () => {
      throw anyError;
    };
    const transformed = errnoTaskSync(original);

    const task = transformed();
    expectTask(task).toRejectSync(errnoExceptionHandler(anyError));
  });
});
