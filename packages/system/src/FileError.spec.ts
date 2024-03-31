import { Option } from '@w5s/core';
import { describe, it, expect } from 'vitest';
import { FileError } from './FileError.js';
import type { FilePath } from './FilePath.js';

describe('FileError', () => {
  const anyPath = 'anyPath' as FilePath;

  describe('()', () => {
    it('should construct FileError instance', () => {
      expect(
        FileError({
          fileErrorType: 'OtherError',
          code: 'ENOENT',
          errno: Option.Some(2),
          path: Option.Some(anyPath),
          syscall: Option.Some('read'),
        })
      ).toEqual(
        expect.objectContaining({
          // _: 'DataError',
          name: 'FileError',
          fileErrorType: 'OtherError',
          code: 'ENOENT',
          path: anyPath,
          syscall: 'read',
        })
      );
    });
    it('should set default default parameters', () => {
      expect(FileError({})).toEqual(
        expect.objectContaining({
          // _: 'DataError',
          name: 'FileError',
          fileErrorType: 'UserError',
          code: Option.None,
          path: Option.None,
          syscall: Option.None,
        })
      );
    });
  });
});
