import { Option } from '@w5s/core';
import { FileError } from './error';
import { FilePath } from './path';

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
  });
});
