import { describe, it, expect, vi } from 'vitest';
import { allSyncCombination, runReportTask } from './_stub.spec.js';
import { taskStub, withTask } from '../testing.js';
import { andRun } from './andRun.js';
import { create } from './create.js';

describe(andRun, () => {
  const anyValue = Object.freeze({ foo: true });
  const anyOtherValue = Object.freeze({ bar: true });
  const expectTask = withTask(expect);

  describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
    const task = taskStub({ delayMs: before === 'async' ? 0 : undefined, value: anyValue });
    const andTask = taskStub({ delayMs: after === 'async' ? 0 : undefined, value: anyOtherValue });

    it('should return a new task with same value', async () => {
      await expectTask(andRun(task, () => andTask)).toResolve(anyValue);
    });
    it('should call callback and run task', async () => {
      const taskCallback = create(({ ok }) => ok(anyOtherValue));
      const taskCallbackSpy = vi.spyOn(taskCallback, 'taskRun');
      await runReportTask(andRun(task, () => taskCallback)).finished;

      expect(taskCallbackSpy).toHaveBeenCalled();
    });
    it('should call callback with task value', async () => {
      const callback = vi.fn(() => andTask);
      await runReportTask(andRun(task, callback)).finished;

      expect(callback).toHaveBeenCalledWith(anyValue);
    });
  });
});
