import { describe, it, expect, vi } from 'vitest';
import { Option, Symbol } from '@w5s/core';
import { Task, type TaskLike } from '@w5s/task';
import { TimeDuration } from '@w5s/time';
import { TimeoutError } from '@w5s/error';
import { withTask } from '@w5s/task/dist/Testing.js';
import { timeout } from './timeout.js';

describe(timeout, () => {
  const expectTask = withTask(expect);
  const anyDelay = TimeDuration(4);
  const anyValue = 'any_value';
  const anyError = 'any_error';

  it('should be identity when timeout duration is Option.None', () => {
    const task = Task.resolve(anyValue);
    expect(timeout(task, Option.None)).toBe(task);
  });

  it('should resolve/reject the same value as task', async () => {
    const resolveNow = Task.resolve(anyValue);
    const resolved = timeout(resolveNow, anyDelay);
    expectTask(resolved).toResolveSync(anyValue);

    const rejectNow = Task.reject(anyError);
    const rejected = timeout(rejectNow, anyDelay);
    expectTask(rejected).toRejectSync(anyError);
  });
  it('should cancel task and setTimeout if task is canceled', async () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    clearTimeoutSpy.mockClear();
    const cancelerFn = vi.fn();
    const canceled = {
      [Symbol.run]: ({ canceler }) => {
        canceler.current = cancelerFn;
      },
    } satisfies TaskLike<any, any>;
    const task = timeout(canceled, anyDelay);
    const controller = new AbortController();
    Task.run(task, { signal: controller.signal });
    controller.abort();
    expect(cancelerFn).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
  it('should cancel task if timeout is triggered', async () => {
    const cancelerFn = vi.fn();
    const willCancel = {
      [Symbol.run]: ({ canceler }) => {
        canceler.current = cancelerFn;
      },
    } satisfies TaskLike<any, any>;
    const task = timeout(willCancel, anyDelay);
    await expectTask(task).toRejectAsync(
      new TimeoutError({
        message: `Task timed out after ${anyDelay}ms`,
      }),
    );
    expect(cancelerFn).toHaveBeenCalled();
  });
  it('should cancel timeout if task is resolved', async () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    clearTimeoutSpy.mockClear();
    const resolved = timeout(Task.resolve(anyValue), anyDelay);
    await expectTask(resolved).toResolve(anyValue);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

    clearTimeoutSpy.mockClear();
    const rejected = timeout(Task.reject(anyError), anyDelay);
    await expectTask(rejected).toReject(anyError);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
  });
});
