import { describe, it, expect, vi } from 'vitest';
import { Symbol } from '@w5s/core';
import { mapError } from './mapError.js';
import { FakeTask, withTask } from '../Testing.js';
import { __run } from './__run.js';
import { TaskCanceler } from '../TaskCanceler.js';

describe(mapError, () => {
  const anyError = Object.freeze({ message: 'error message' });
  const anyValue = Object.freeze({ foo: true });
  const expectTask = withTask(expect);

  it('keeps unchanged when success', async () => {
    const task = FakeTask<typeof anyValue, typeof anyError>({ value: anyValue });
    const mapTask = mapError(task, (_) => ({ ..._, bar: true }));

    expectTask(mapTask).toResolveSync(anyValue);
  });
  it('maps error when success', async () => {
    const task = FakeTask<typeof anyValue, typeof anyError>({ error: anyError });
    const mapTask = mapError(task, (_) => ({ ..._, bar: true }));

    expectTask(mapTask).toRejectSync({
      ...anyError,
      bar: true,
    });
  });
  it('maps error when async failure', async () => {
    const task = FakeTask({ delayMs: 0, error: anyError });
    const mapTask = mapError(task, (_) => ({ ..._, bar: true }));

    await expectTask(mapTask).toRejectAsync({
      ...anyError,
      bar: true,
    });
  });
  it('forwards canceler', async () => {
    const task = FakeTask<typeof anyValue, typeof anyError>({ delayMs: 0, value: anyValue });
    const mapTask = mapError(task, (_) => _);
    vi.spyOn(task, Symbol.run);
    const canceler = new TaskCanceler();
    const result = __run(mapTask, canceler);

    expect(task[Symbol.run]).toHaveBeenCalledWith({
      resolve: expect.any(Function),
      reject: expect.any(Function),
      canceler,
    });
    await result;
  });
});
