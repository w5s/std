import { describe, expect, it, vi } from 'vitest';
import { tryCall } from './tryCall.js';
import { Ok } from './Ok.js';
import { Error } from './Error.js';

describe(tryCall, () => {
  class TestError extends globalThis.Error {
    constructor() {
      super();
      this.name = 'TestError';
    }

    override name = 'TestError';
  }
  describe('sync', () => {
    it('should return Ok(block()) when nothing is thrown', () => {
      expect(
        tryCall(
          () => 'return_value',
          () => new TestError()
        )
      ).toEqual(Ok('return_value'));
    });
    it('should return Error(onError(error)) when error is thrown', () => {
      const thrownError = new globalThis.Error('custom');
      const onError = vi.fn((_error: unknown) => new TestError());
      expect(
        tryCall(() => {
          throw thrownError;
        }, onError)
      ).toEqual(Error(new TestError()));
      expect(onError).toHaveBeenCalledWith(thrownError);
    });
  });
  describe('async', () => {
    it('should return Ok(block()) when nothing is thrown', async () => {
      await expect(
        tryCall(
          async () => 'return_value',
          async () => new TestError()
        )
      ).resolves.toEqual(Ok('return_value'));
    });
    it('should return Error(onError(error)) when promise is rejected', async () => {
      const thrownError = new globalThis.Error('custom');
      const onError = vi.fn(async (_error: unknown) => new TestError());
      await expect(tryCall((): Promise<string> => Promise.reject(thrownError), onError)).resolves.toEqual(
        Error(new TestError())
      );
      expect(onError).toHaveBeenCalledWith(thrownError);
    });
  });
});
