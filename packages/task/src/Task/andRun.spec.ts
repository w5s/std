import { describe, it, expect, vi } from 'vitest';
import { allSyncCombination } from './_stub.spec.js';
import { FakeTask, withTask } from '../Testing.js';
import { andRun } from './andRun.js';
import { create } from './create.js';
import { run } from './run.js';

describe(andRun, () => {
  const anyValue = Object.freeze({ foo: true });
  const anyOtherValue = Object.freeze({ bar: true });
  const expectTask = withTask(expect);

  describe.each(allSyncCombination)('(%s, () => %s)', (before, after) => {
    const task = FakeTask({ delayMs: before === 'async' ? 0 : undefined, value: anyValue });
    const andTask = FakeTask({ delayMs: after === 'async' ? 0 : undefined, value: anyOtherValue });

    it('should return a new task with same value', async () => {
      await (before === 'async' || after === 'async'
        ? expectTask(andRun(task, () => andTask)).toResolveAsync(anyValue)
        : expectTask(andRun(task, () => andTask)).toResolveSync(anyValue));
    });
    it('should call callback and run task', async () => {
      const taskCallback = create(({ ok }) => ok(anyOtherValue));
      const taskCallbackSpy = vi.spyOn(taskCallback, 'taskRun');
      await run(andRun(task, () => taskCallback));

      expect(taskCallbackSpy).toHaveBeenCalled();
    });
    it('should call callback with task value', async () => {
      const callback = vi.fn(() => andTask);
      await run(andRun(task, callback));

      expect(callback).toHaveBeenCalledWith(anyValue);
    });
  });
});
