import { describe, it, expect, vi } from 'vitest';
import { tryCall } from './tryCall.js';
import { withTask } from '../Testing.js';

describe(tryCall, () => {
  const expectTask = withTask(expect);

  class TestError extends Error {
    override name = 'TestError';

    constructor(public innerError: unknown = undefined) {
      super('TestMessage');
    }
  }
  it('should resolve(block()) when nothing is thrown', async () => {
    const task = tryCall(
      () => 'return_value',
      () => new TestError()
    );
    await expectTask(task).toResolve('return_value');
  });
  it('should reject(onError(error)) when error is thrown', async () => {
    const thrownError = new Error('custom');
    const onError = vi.fn((_error: unknown) => new TestError());
    const task = tryCall(() => {
      throw thrownError;
    }, onError);
    await expectTask(task).toReject(new TestError());
    expect(onError).toHaveBeenCalledWith(thrownError);
  });
  it('should return Result.Ok(block()) when nothing is thrown (async handler)', async () => {
    const task = tryCall(
      async () => 'return_value',
      async (innerError) => new TestError(innerError)
    );
    await expectTask(task).toResolve('return_value');
  });
  it('should return Result.Ok(block()) when nothing is thrown (sync handler)', async () => {
    const task = tryCall(
      () => 'return_value',
      async (innerError) => new TestError(innerError)
    );
    await expectTask(task).toResolve('return_value');
  });
  it('should return Result.Error(onError(error)) when promise is rejected (async handler)', async () => {
    const thrownError = new Error('custom');
    const onError = vi.fn(async (innerError: unknown) => new TestError(innerError));
    const task = tryCall(() => Promise.reject(thrownError), onError);

    await expectTask(task).toReject(new TestError(thrownError));
    expect(onError).toHaveBeenCalledWith(thrownError);
  });
  it('should return Result.Error(onError(error)) when promise is rejected (sync handler)', async () => {
    const thrownError = new Error('custom');
    const onError = vi.fn((innerError: unknown) => new TestError(innerError));
    const task = tryCall(() => Promise.reject(thrownError), onError);
    await expectTask(task).toReject(new TestError(thrownError));
    expect(onError).toHaveBeenCalledWith(thrownError);
  });
});
