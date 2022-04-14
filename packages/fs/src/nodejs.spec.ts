import * as nodeFS from 'node:fs';
import { ErrnoException } from './nodejs.js';

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
