import { describe, it, expect, vi } from 'vitest';
import { allSyncCombination, runReportTask } from './_stub.spec.js';
import { taskStub, withTask } from '../Testing.js';
import { andThen } from './andThen.js';

describe(andThen, () => {
  const anyError = Object.freeze({ message: 'error message' });
  const anyValue = Object.freeze({ foo: true });
  const expectTask = withTask(expect);

  describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
    const stringify = (num: number) =>
      taskStub<string, 'TestError'>({ delayMs: after === 'async' ? 0 : undefined, value: String(num) });

    it('should return unchanged result when failure', async () => {
      const task = taskStub<number, 'TestError'>({
        delayMs: before === 'async' ? 0 : undefined,
        error: 'TestError',
      });
      const thenTask = andThen(task, stringify);
      await expectTask(thenTask).toReject('TestError');
    });
    it('should map value when success', async () => {
      const task = taskStub<number, 'TestError'>({ delayMs: before === 'async' ? 0 : undefined, value: 4 });
      const thenTask = andThen(task, stringify);
      await expectTask(thenTask).toResolve('4');
    });
  });

  it('should forward canceler', async () => {
    const task = taskStub<typeof anyValue, typeof anyError>({ delayMs: 0, value: anyValue });
    const afterTask = taskStub<typeof anyValue, typeof anyError>({ delayMs: 0, value: anyValue });
    const thenTask = andThen(task, (_) => afterTask);
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
