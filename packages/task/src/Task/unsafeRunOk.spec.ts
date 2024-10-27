import { describe, expect, it, vi } from 'vitest';
import { Ref } from '@w5s/core';
import { unsafeRunOk } from './unsafeRunOk.js';
import { Task } from '../Task.js';
import { FakeTask } from '../Testing.js';
import { unsafeRun } from './unsafeRun.js';

const anyError = new Error('TestError');
const anyObject = Object.freeze({ foo: true });

describe(unsafeRunOk, () => {
  it('should run throwing task', () => {
    const task = FakeTask({ throwError: anyError });

    expect(() => unsafeRunOk(task)).toThrow(anyError);
  });
  it('should return the result of task.taskRun() for sync', () => {
    const task = FakeTask({ value: anyObject });

    expect(unsafeRunOk(task)).toEqual(anyObject);
  });
  it('should return the result of task.taskRun() for async', async () => {
    const task = FakeTask({ value: anyObject, delayMs: 1 });

    await expect(unsafeRunOk(task)).resolves.toEqual(anyObject);
  });
  it('should run rejected task', async () => {
    const task = Task.create(() => Promise.reject(new Error('TestError')));
    await expect(unsafeRunOk(task)).rejects.toEqual(new Error('TestError'));
  });
  it('should handle canceler', () => {
    const canceler = Ref(undefined);
    const task = { taskRun: vi.fn() };
    void unsafeRunOk(task, canceler);
    expect(task.taskRun).toHaveBeenCalledWith({
      resolve: expect.any(Function),
      reject: expect.any(Function),
      canceler,
      run: unsafeRun,
    });
  });
});
