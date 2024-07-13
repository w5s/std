import { describe, it, expect, vi } from 'vitest';
import { allSyncCombination, runReportTask } from './_stub.spec.js';
import { taskStub, withTask } from '../Testing.js';
import { orElse } from './orElse.js';

describe(orElse, () => {
  const anyError = Object.freeze({ message: 'error message' });
  const anyValue = Object.freeze({ foo: true });
  const expectTask = withTask(expect);

  describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
    const handleError = (message: string) =>
      taskStub<string, string>({ delayMs: after === 'async' ? 0 : undefined, value: `${message}_handled` });

    it('should return unchanged result when Result.Ok', async () => {
      const task = taskStub<string, 'TestError'>({
        delayMs: before === 'async' ? 0 : undefined,
        value: 'anyValue',
      });
      const taskElse = orElse(task, handleError);
      await expectTask(taskElse).toResolve('anyValue');
    });
    it('should map value when Result.Ok', async () => {
      const task = taskStub<string, 'TestError'>({
        delayMs: before === 'async' ? 0 : undefined,
        error: 'TestError',
      });
      const taskElse = orElse(task, handleError);
      await expectTask(taskElse).toResolve('TestError_handled');
    });
  });

  it('should forward canceler', async () => {
    const task = taskStub<typeof anyValue, typeof anyError>({ delayMs: 0, error: anyError });
    const afterTask = taskStub<typeof anyValue, typeof anyError>({ delayMs: 0, value: anyValue });
    const thenTask = orElse(task, (_) => afterTask);
    vi.spyOn(task, 'taskRun');
    vi.spyOn(afterTask, 'taskRun');
    const runReport = runReportTask(thenTask);
    await runReport.finished;

    expect(task.taskRun).toHaveBeenCalledWith({
      resolve: expect.any(Function),
      reject: expect.any(Function),
      canceler: runReport.cancelerRef,
      run: runReport.run,
    });
    expect(afterTask.taskRun).toHaveBeenCalledWith({
      resolve: expect.any(Function),
      reject: expect.any(Function),
      canceler: runReport.cancelerRef,
      run: runReport.run,
    });
  });
});
