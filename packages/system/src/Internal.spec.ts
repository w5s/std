import { Option } from '@w5s/core';
import { withTask } from '@w5s/task/dist/Testing.js';
import { describe, expect, it } from 'vitest';

import type { FilePath } from './FilePath.js';

import { anyErrnoException, anyError } from './_test/config.js';
import { FileError } from './FileError.js';
import { ErrnoException, errnoExceptionHandler, errnoTask, errnoTaskSync } from './Internal.js';

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
      new FileError({
        cause: 'anything',
        code: Option.None,
        errno: Option.None,
        fileErrorType: 'OtherError',
        path: Option.None,
        syscall: Option.None,
      }),
    );
  });
  it('should convert any ErrnoException to "OtherError" and forward properties', () => {
    expect(errnoExceptionHandler(anyErrnoException)).toEqual(
      new FileError({
        cause: anyErrnoException,
        code: anyErrnoException.code,
        errno: anyErrnoException.errno,
        fileErrorType: 'OtherError',
        path: anyErrnoException.path as FilePath,
        syscall: anyErrnoException.syscall,
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
