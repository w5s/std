import { Ref, Result, Task, unsafeRun } from '@w5s/core';
import { TimeDuration } from '@w5s/time';
import { describe, it, expect, vi } from 'vitest';
import { timeout, TimeoutError } from './timeout.js';

describe('timeout', () => {
  const anyDelay = TimeDuration.milliseconds(4);
  const anyValue = 'any_value';
  const anyError = 'any_error';

  it('should resolve/reject the same value as task', async () => {
    const resolveNow = Task.resolve(anyValue);
    const resolved = timeout(resolveNow, anyDelay);
    expect(unsafeRun(resolved)).toEqual(Result.Ok(anyValue));

    const rejectNow = Task.reject(anyError);
    const rejected = timeout(rejectNow, anyDelay);
    expect(unsafeRun(rejected)).toEqual(Result.Error(anyError));
  });
  it('should cancel task and setTimeout if task is canceled', async () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    clearTimeoutSpy.mockClear();
    const cancelerFn = vi.fn();
    const run = vi.fn();
    const canceled = {
      taskRun: ({ canceler }) => {
        canceler.current = cancelerFn;
      },
    } satisfies Task<any, any>;
    const task = timeout(canceled, anyDelay);
    const cancelerRef = Ref(cancelerFn);
    task.taskRun({
      resolve: () => {},
      reject: () => {},
      canceler: cancelerRef,
      run,
    });
    cancelerRef.current();
    expect(cancelerFn).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
  it('should cancel task if timeout is triggered', async () => {
    const cancelerFn = vi.fn();
    const willCancel = {
      taskRun: ({ canceler }) => {
        canceler.current = cancelerFn;
      },
    } satisfies Task<any, any>;
    const task = timeout(willCancel, anyDelay);
    await expect(unsafeRun(task)).resolves.toEqual(
      Result.Error(
        TimeoutError({
          message: `Task timed out after ${anyDelay}ms`,
          delay: anyDelay,
        })
      )
    );
    expect(cancelerFn).toHaveBeenCalled();
  });
  it('should cancel timeout if task is resolved', async () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    clearTimeoutSpy.mockClear();
    const resolved = timeout(Task.resolve(anyValue), anyDelay);
    await unsafeRun(resolved);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

    clearTimeoutSpy.mockClear();
    const rejected = timeout(Task.reject(anyError), anyDelay);
    await unsafeRun(rejected);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
  });
});
