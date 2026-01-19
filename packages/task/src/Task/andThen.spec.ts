import { describe, it, expect, vi } from 'vitest';
import { Symbol } from '@w5s/core';
import { allSyncCombination } from './_stub.spec.js';
import { FakeTask, withTask } from '../Testing.js';
import { andThen } from './andThen.js';
import { __run } from './__run.js';
import { TaskCanceler } from '../TaskCanceler.js';

describe(andThen, () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const anyError = Object.freeze({ message: 'error message' });
  const anyValue = Object.freeze({ foo: true });
  const expectTask = withTask(expect);

  describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
    const stringify = (num: number) =>
      FakeTask<string, 'TestError'>({ delayMs: after === 'async' ? 0 : undefined, value: String(num) });

    it('should return unchanged result when failure', async () => {
      const task = FakeTask<number, 'TestError'>({
        delayMs: before === 'async' ? 0 : undefined,
        error: 'TestError',
      });
      const thenTask = andThen(task, stringify);
      await (before === 'async'
        ? expectTask(thenTask).toRejectAsync('TestError')
        : expectTask(thenTask).toRejectSync('TestError'));
    });
    it('should map value when success', async () => {
      const task = FakeTask<number, 'TestError'>({ delayMs: before === 'async' ? 0 : undefined, value: 4 });
      const thenTask = andThen(task, stringify);

      await (before === 'async' || after === 'async'
        ? expectTask(thenTask).toResolveAsync('4')
        : expectTask(thenTask).toResolveSync('4'));
    });
  });

  it('should forward canceler', async () => {
    const task = FakeTask<typeof anyValue, typeof anyError>({ delayMs: 0, value: anyValue });
    const afterTask = FakeTask<typeof anyValue, typeof anyError>({ delayMs: 0, value: anyValue });
    const thenTask = andThen(task, (_) => afterTask);
    vi.spyOn(task, Symbol.run);
    vi.spyOn(afterTask, Symbol.run);
    const canceler = new TaskCanceler();
    const result = __run(thenTask, canceler);
    await result;
    expect(task[Symbol.run]).toHaveBeenCalledWith({
      resolve: expect.any(Function),
      reject: expect.any(Function),
      canceler,
    });
    expect(afterTask[Symbol.run]).toHaveBeenCalledWith({
      resolve: expect.any(Function),
      reject: expect.any(Function),
      canceler,
    });
  });
});
