import { Option } from '@w5s/core';
import { describe, it, expect } from 'vitest';
import { FileError } from './FileError.js';
import type { FilePath } from './FilePath.js';

describe('FileError', () => {
  const anyPath = 'anyPath' as FilePath;

  describe('()', () => {
    it('should construct FileError instance', () => {
      expect(
        new FileError({
          fileErrorType: 'OtherError',
          code: 'ENOENT',
          errno: Option.Some(2),
          path: Option.Some(anyPath),
          syscall: Option.Some('read'),
        }),
      ).toEqual(
        expect.objectContaining({
          name: 'FileError',
          fileErrorType: 'OtherError',
          code: 'ENOENT',
          path: anyPath,
          syscall: 'read',
        }),
      );
    });
  });
});
