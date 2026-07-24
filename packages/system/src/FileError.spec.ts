import { Option } from '@w5s/core';
import { describe, expect, it } from 'vitest';

import type { FilePath } from './FilePath.js';

import { FileError } from './FileError.js';

describe('FileError', () => {
  const anyPath = 'anyPath' as FilePath;

  describe('()', () => {
    it('should construct FileError instance', () => {
      expect(
        new FileError({
          code: 'ENOENT',
          errno: Option.Some(2),
          fileErrorType: 'OtherError',
          path: Option.Some(anyPath),
          syscall: Option.Some('read'),
        }),
      ).toEqual(
        expect.objectContaining({
          code: 'ENOENT',
          fileErrorType: 'OtherError',
          name: 'FileError',
          path: anyPath,
          syscall: 'read',
        }),
      );
    });
  });
});
