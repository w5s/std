import { Option } from '@w5s/core';
import { describe, test, expect } from '@jest/globals';
import { FileError } from './error.js';
import { FilePath } from './filePath.js';

describe(FileError, () => {
  const anyPath = 'anyPath' as FilePath;

  describe('()', () => {
    test('should construct FileError instance', () => {
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
          _type: 'DataError',
          name: 'FileError',
          fileErrorType: 'OtherError',
          code: 'ENOENT',
          path: anyPath,
          syscall: 'read',
        })
      );
    });
    test('should set default default parameters', () => {
      expect(FileError({})).toEqual(
        expect.objectContaining({
          _type: 'DataError',
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
