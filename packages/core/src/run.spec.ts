import { describe, expect, it, vi } from 'vitest';
import { Result } from './result.js';
import { Canceler, unsafeRun, unsafeRunOk } from './run.js';
import { Task } from './task.js';
import { Ref } from './ref.js';
import { taskStub } from './testing.js';

const anyError = new Error('TestError');
const anyObject = Object.freeze({ foo: true });

describe('Canceler', () => {
  describe('.clear', () => {
    it('', () => {
      const canceler = Ref(() => {});
      Canceler.clear(canceler);
      expect(canceler).toEqual({ current: undefined });
    });
  });
  describe('.cancel', () => {
    it('should run the canceler function', () => {
      const fn = vi.fn();
      const canceler = Ref(fn);
      Canceler.cancel(canceler);
      expect(fn).toHaveBeenCalledOnce();
    });

    it('should handle gracefully exceptions', () => {
      const fn = vi.fn(() => {
        throw new Error('SomeError');
      });
      const canceler = Ref(fn);
      expect(() => {
        Canceler.cancel(canceler);
      }).toThrow();
      expect(canceler.current).toBe(undefined);
    });
  });
});

describe('unsafeRun', () => {
  it('should run throwing task', () => {
    const task = Task(() => {
      throw anyError;
    });
    expect(() => unsafeRun(task)).toThrow(anyError);
  });
  it('should return the result of task.taskRun() for sync', () => {
    expect(unsafeRun(Task(({ ok }) => ok(anyObject)))).toEqual(Result.Ok(anyObject));
  });
  it('should return the result of task.taskRun() for async', async () => {
    await expect(
      unsafeRun(
        Task(
          ({ ok }) =>
            new Promise<Result<typeof anyObject, never>>((resolve) => {
              setTimeout(() => resolve(ok(anyObject)), 0);
            })
        )
      )
    ).resolves.toEqual(Result.Ok(anyObject));
  });
  it('should run rejected task', async () => {
    const task = Task(() => Promise.reject(new Error('TestError')));
    await expect(unsafeRun(task)).rejects.toEqual(new Error('TestError'));
  });
  it('should handle canceler', () => {
    const canceler = Ref(undefined);
    const task = { taskRun: vi.fn() };
    void unsafeRun(task, canceler);
    expect(task.taskRun).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), canceler, unsafeRun);
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
    const task = Task(() => Promise.reject(new Error('TestError')));
    await expect(unsafeRunOk(task)).rejects.toEqual(new Error('TestError'));
  });
  it('should handle canceler', () => {
    const canceler = Ref(undefined);
    const task = { taskRun: vi.fn() };
    void unsafeRunOk(task, canceler);
    expect(task.taskRun).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), canceler, unsafeRun);
  });
});
