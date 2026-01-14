import { describe, expect, it, vi } from 'vitest';
import { Result, Symbol } from '@w5s/core';
import { run } from './run.js';
import { Task, type TaskLike } from '../Task.js';

const anyError = new Error('TestError');
const anyObject = Object.freeze({ foo: true });

describe(run, () => {
  it('should run throwing task', () => {
    const task = Task.create(() => {
      throw anyError;
    });
    expect(() => run(task)).toThrow(anyError);
  });
  it('should return the result of task[Symbol.run]() for sync', () => {
    expect(run(Task.create(() => Task.ok(anyObject)))).toEqual(Result.Ok(anyObject));
  });
  it('should return the result of task[Symbol.run]() for async', async () => {
    await expect(
      run(
        Task.create(
          () =>
            new Promise<Result<typeof anyObject, never>>((resolve) => {
              setTimeout(() => resolve(Task.ok(anyObject)), 0);
            }),
        ),
      ),
    ).resolves.toEqual(Result.Ok(anyObject));
  });
  it('should run rejected task', async () => {
    const task = Task.create(() => Promise.reject(new Error('TestError')));
    await expect(run(task)).rejects.toEqual(new Error('TestError'));
  });
  it('should handle canceler', async () => {
    const controller = new AbortController();
    const cancelerFn = vi.fn();
    const task: TaskLike<any, any> = {
      [Symbol.run]: vi.fn(({ canceler }) => {
        canceler.addEventListener('abort', cancelerFn);

        return Promise.resolve();
      }),
    };
    void run(task, { signal: controller.signal });
    controller.abort();

    expect(task[Symbol.run]).toHaveBeenCalled();
    await Promise.resolve();
    expect(cancelerFn).toHaveBeenCalledTimes(1);
  });
});
