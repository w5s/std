import { describe, it, expect, vi } from 'vitest';
import { Option, Ref, Result } from '@w5s/core';
import { Task, type TaskLike } from '@w5s/task';
import { TimeDuration } from '@w5s/time';
import { TimeoutError } from '@w5s/error';
import { timeout } from './timeout.js';

describe(timeout, () => {
  const anyDelay = TimeDuration.milliseconds(4);
  const anyValue = 'any_value';
  const anyError = 'any_error';

  it('should be identity when timeout duration is Option.None', () => {
    const task = Task.resolve(anyValue);
    expect(timeout(task, Option.None)).toBe(task);
  });

  it('should resolve/reject the same value as task', async () => {
    const resolveNow = Task.resolve(anyValue);
    const resolved = timeout(resolveNow, anyDelay);
    expect(Task.run(resolved)).toEqual(Result.Ok(anyValue));

    const rejectNow = Task.reject(anyError);
    const rejected = timeout(rejectNow, anyDelay);
    expect(Task.run(rejected)).toEqual(Result.Error(anyError));
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
    } satisfies TaskLike<any, any>;
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
    } satisfies TaskLike<any, any>;
    const task = timeout(willCancel, anyDelay);
    await expect(Task.run(task)).resolves.toEqual(
      Result.Error(
        TimeoutError({
          message: `Task timed out after ${anyDelay}ms`,
        }),
      ),
    );
    expect(cancelerFn).toHaveBeenCalled();
  });
  it('should cancel timeout if task is resolved', async () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    clearTimeoutSpy.mockClear();
    const resolved = timeout(Task.resolve(anyValue), anyDelay);
    await Task.run(resolved);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

    clearTimeoutSpy.mockClear();
    const rejected = timeout(Task.reject(anyError), anyDelay);
    await Task.run(rejected);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
  });
});
