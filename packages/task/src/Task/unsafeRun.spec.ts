import { describe, expect, it, vi } from 'vitest';
import { Result, Ref } from '@w5s/core';
import { unsafeRun } from './unsafeRun.js';
import { Task } from '../Task.js';

const anyError = new Error('TestError');
const anyObject = Object.freeze({ foo: true });

describe(unsafeRun, () => {
  it('should run throwing task', () => {
    const task = Task.create(() => {
      throw anyError;
    });
    expect(() => unsafeRun(task)).toThrow(anyError);
  });
  it('should return the result of task.taskRun() for sync', () => {
    expect(unsafeRun(Task.create(({ ok }) => ok(anyObject)))).toEqual(Result.Ok(anyObject));
  });
  it('should return the result of task.taskRun() for async', async () => {
    await expect(
      unsafeRun(
        Task.create(
          ({ ok }) =>
            new Promise<Result<typeof anyObject, never>>((resolve) => {
              setTimeout(() => resolve(ok(anyObject)), 0);
            }),
        ),
      ),
    ).resolves.toEqual(Result.Ok(anyObject));
  });
  it('should run rejected task', async () => {
    const task = Task.create(() => Promise.reject(new Error('TestError')));
    await expect(unsafeRun(task)).rejects.toEqual(new Error('TestError'));
  });
  it('should handle canceler', () => {
    const canceler = Ref(undefined);
    const task = { taskRun: vi.fn() };
    void unsafeRun(task, canceler);
    expect(task.taskRun).toHaveBeenCalledWith({
      resolve: expect.any(Function),
      reject: expect.any(Function),
      canceler,
      run: unsafeRun,
    });
  });
});
