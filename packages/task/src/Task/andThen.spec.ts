import { Symbol } from '@w5s/core';
import { describe, expect, it, vi } from 'vitest';

import { taskRun } from '../internal/taskRun.js';
import { TaskCanceler } from '../TaskCanceler.js';
import { FakeTask, withTask } from '../Testing.js';
import { allSyncCombination } from './_stub.spec.js';
import { andThen } from './andThen.js';

describe(andThen, () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
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
    const result = taskRun(thenTask, canceler);
    await result;
    expect(task[Symbol.run]).toHaveBeenCalledWith({
      canceler,
      reject: expect.any(Function),
      resolve: expect.any(Function),
    });
    expect(afterTask[Symbol.run]).toHaveBeenCalledWith({
      canceler,
      reject: expect.any(Function),
      resolve: expect.any(Function),
    });
  });
});
