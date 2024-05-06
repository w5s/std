import { describe, expect, it, vi } from 'vitest';
import { Result } from './Result.js';
import { unsafeRun, unsafeRunOk } from './run.js';
import { Task } from './Task.js';
import { Ref } from './Ref.js';
import { taskStub } from './testing.js';

const anyError = new Error('TestError');
const anyObject = Object.freeze({ foo: true });

describe('unsafeRun', () => {
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
            })
        )
      )
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
describe('unsafeRunOk', () => {
  it('should run throwing task', () => {
    const task = taskStub({ throwError: anyError });

    expect(() => unsafeRunOk(task)).toThrow(anyError);
  });
  it('should return the result of task.taskRun() for sync', () => {
    const task = taskStub({ value: anyObject });

    expect(unsafeRunOk(task)).toEqual(anyObject);
  });
  it('should return the result of task.taskRun() for async', async () => {
    const task = taskStub({ value: anyObject, delayMs: 1 });

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
