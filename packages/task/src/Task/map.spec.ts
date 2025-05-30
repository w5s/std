import { describe, it, expect, vi } from 'vitest';
import { Ref, Symbol } from '@w5s/core';
import { FakeTask, withTask } from '../Testing.js';
import { map } from './map.js';
import { run } from './run.js';

describe(map, () => {
  const anyError = 'anyError';
  const anyValue = Object.freeze({ foo: true });
  const expectTask = withTask(expect);

  it('keeps unchanged when failure', async () => {
    const task = FakeTask<typeof anyValue, typeof anyError>({ error: anyError });
    const mapTask = map(task, (_) => ({ ..._, bar: true }));

    expectTask(mapTask).toRejectSync(anyError);
  });
  it('maps value when success', async () => {
    const task = FakeTask({ value: anyValue });
    const mapTask = map(task, (_) => ({ ..._, bar: true }));
    expectTask(mapTask).toResolveSync({
      ...anyValue,
      bar: true,
    });
  });
  it('maps value when async success', async () => {
    const task = FakeTask({ delayMs: 0, value: anyValue });
    const mapTask = map(task, (_) => ({ ..._, bar: true }));
    await expectTask(mapTask).toResolveAsync({
      ...anyValue,
      bar: true,
    });
  });
  it('forwards canceler', async () => {
    const task = FakeTask<typeof anyValue, typeof anyError>({ delayMs: 0, value: anyValue });
    const mapTask = map(task, (_) => _);
    vi.spyOn(task, Symbol.run);
    const canceler = Ref(() => {});
    const result = run(mapTask, canceler);
    expect(task[Symbol.run]).toHaveBeenCalledWith({
      resolve: expect.any(Function),
      reject: expect.any(Function),
      canceler,
      execute: expect.any(Function),
    });
    await result;
  });
});
