import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Ref, Result } from '@w5s/core';
import { Task } from '@w5s/task';
import { TimeDuration } from '../TimeDuration.js';
import { delay } from './delay.js';

describe('.delay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.useFakeTimers();
  const anyDuration = TimeDuration.seconds(12);
  const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
  const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');

  it('should return a task that resolves after duration', async () => {
    const task = delay(anyDuration);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(0);

    const promise = Task.unsafeRun(task);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenLastCalledWith(expect.any(Function), anyDuration);
    vi.runAllTimers();
    await expect(promise).resolves.toEqual(Result.Ok(Date.now()));
  });
  it('should be cancelable', () => {
    const duration = TimeDuration.seconds(1);
    const task = delay(duration);

    const canceler = Ref(() => {});
    const resolve = vi.fn();
    const reject = vi.fn();
    const run = vi.fn();

    // Run task
    task.taskRun({ resolve, reject, canceler, run });
    // Memorize the last setTimeout call
    // eslint-disable-next-line unicorn/prefer-at
    const setTimeoutResult = setTimeoutSpy.mock.results[setTimeoutSpy.mock.results.length - 1]?.value;

    // Trigger cancellation
    Ref.read(canceler)();

    vi.runAllTimers();

    expect(resolve).not.toHaveBeenCalled();
    expect(reject).not.toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(clearTimeoutSpy).toHaveBeenLastCalledWith(setTimeoutResult);
  });
});
