import { describe, it, expect, vi } from 'vitest';
import { Symbol } from '@w5s/core';
import { allSyncCombination } from './_stub.spec.js';
import { FakeTask, withTask } from '../Testing.js';
import { orElse } from './orElse.js';
import { __run } from './__run.js';
import { TaskCanceler } from '../TaskCanceler.js';

describe(orElse, () => {
  const anyError = Object.freeze({ message: 'error message' });
  const anyValue = Object.freeze({ foo: true });
  const expectTask = withTask(expect);

  describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
    const handleError = (message: string) =>
      FakeTask<string, string>({ delayMs: after === 'async' ? 0 : undefined, value: `${message}_handled` });

    it('should return unchanged result when Result.Ok', async () => {
      const task = FakeTask<string, 'TestError'>({
        delayMs: before === 'async' ? 0 : undefined,
        value: 'anyValue',
      });
      const taskElse = orElse(task, handleError);
      await (before === 'async'
        ? expectTask(taskElse).toResolveAsync('anyValue')
        : expectTask(taskElse).toResolveSync('anyValue'));
    });
    it('should map value when Result.Ok', async () => {
      const task = FakeTask<string, 'TestError'>({
        delayMs: before === 'async' ? 0 : undefined,
        error: 'TestError',
      });
      const taskElse = orElse(task, handleError);

      await (before === 'async' || after === 'async'
        ? expectTask(taskElse).toResolveAsync('TestError_handled')
        : expectTask(taskElse).toResolveSync('TestError_handled'));
    });
  });

  it('should forward canceler', async () => {
    const task = FakeTask<typeof anyValue, typeof anyError>({ delayMs: 0, error: anyError });
    const afterTask = FakeTask<typeof anyValue, typeof anyError>({ delayMs: 0, value: anyValue });
    const thenTask = orElse(task, (_) => afterTask);
    vi.spyOn(task, Symbol.run);
    vi.spyOn(afterTask, Symbol.run);
    const canceler = TaskCanceler();
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
