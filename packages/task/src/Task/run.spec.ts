import { describe, expect, it, vi } from 'vitest';
import { Result, Ref, Symbol } from '@w5s/core';
import { run } from './run.js';
import { Task } from '../Task.js';

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
  it('should handle canceler', () => {
    const canceler = Ref(undefined);
    const task = { [Symbol.run]: vi.fn() };
    void run(task, canceler);
    expect(task[Symbol.run]).toHaveBeenCalledWith({
      resolve: expect.any(Function),
      reject: expect.any(Function),
      canceler,
      execute: expect.any(Function),
    });
  });
});
