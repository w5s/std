import { Ref, Result, Task, TimeDuration } from '@w5s/core';
import { describe, test, expect, jest } from '@jest/globals';
import { timeout, TimeoutError } from './timeout.js';

describe(timeout, () => {
  const anyDelay = TimeDuration.milliseconds(4);
  const anyValue = 'any_value';
  const anyError = 'any_error';

  test('should resolve/reject the same value as task', async () => {
    const resolveNow = Task.resolve(anyValue);
    const resolved = timeout(resolveNow, anyDelay);
    expect(Task.unsafeRun(resolved)).toEqual(Result.Ok(anyValue));

    const rejectNow = Task.reject(anyError);
    const rejected = timeout(rejectNow, anyDelay);
    expect(Task.unsafeRun(rejected)).toEqual(Result.Error(anyError));
  });
  test('should cancel task and setTimeout if task is canceled', async () => {
    const clearTimeoutSpy = jest.spyOn(globalThis, 'clearTimeout');
    clearTimeoutSpy.mockClear();
    const canceler = jest.fn();
    const canceled = Task.wrap((_resolve, _reject, cancelerRef) => {
      cancelerRef.current = canceler;
    });
    const task = timeout(canceled, anyDelay);
    const cancelerRef = Ref(canceler);
    task.taskRun(
      () => {},
      () => {},
      cancelerRef
    );
    cancelerRef.current();
    expect(canceler).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
  test('should cancel task if timeout is triggered', async () => {
    const canceler = jest.fn();
    const willCancel = Task.wrap((_resolve, _reject, cancelerRef) => {
      cancelerRef.current = canceler;
    });
    const task = timeout(willCancel, anyDelay);
    await expect(Task.unsafeRun(task)).resolves.toEqual(
      Result.Error(
        TimeoutError({
          message: `Task timed out after ${anyDelay}ms`,
          delay: anyDelay,
        })
      )
    );
    expect(canceler).toHaveBeenCalled();
  });
  test('should cancel timeout if task is resolved', async () => {
    const clearTimeoutSpy = jest.spyOn(globalThis, 'clearTimeout');
    clearTimeoutSpy.mockClear();
    const resolved = timeout(Task.resolve(anyValue), anyDelay);
    await Task.unsafeRun(resolved);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

    clearTimeoutSpy.mockClear();
    const rejected = timeout(Task.reject(anyError), anyDelay);
    await Task.unsafeRun(rejected);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
  });
});
