import { describe, expect, it, vi } from 'vitest';
import { all } from './all.js';
import { assertType, taskStub, withTask } from '../Testing.js';
import type { Task } from '../Task.js';
import { runReportTask } from './_stub.spec.js';

describe(all, () => {
  const expectTask = withTask(expect);

  it('should return empty array if empty', async () => {
    const allTask = all([]);
    await expectTask(allTask).toResolve([]);
  });
  it('should reject first error', async () => {
    const allTask = all([
      taskStub({ delayMs: 1, value: 'value1' }),
      taskStub({ delayMs: 1, error: 'error1' }),
      taskStub({ delayMs: 1, value: 'value2' }),
      taskStub({ delayMs: 1, error: 'error2' }),
    ]);
    await expectTask(allTask).toReject('error1');
  });

  it('should cancel other tasks', async () => {
    const taskCount = 4;
    const taskData = Array.from({ length: taskCount }).map((_, taskIndex) => {
      const canceler = vi.fn();
      return {
        task:
          taskIndex === 0
            ? taskStub({ delayMs: 1, error: `error${taskIndex}`, canceler })
            : taskStub({ delayMs: 100, value: `value${taskIndex}`, canceler }),
        canceler,
      };
    });
    const allTask = all(taskData.map((_) => _.task));
    await expectTask(allTask).toReject('error0');

    taskData.forEach(({ canceler }, cancelerIndex) => {
      expect(canceler).toHaveBeenCalledTimes(cancelerIndex === 0 ? 0 : 1);
    });
  });
  it('should cancel every tasks when canceled', async () => {
    const taskCount = 4;
    const taskData = Array.from({ length: taskCount }).map((_, taskIndex) => {
      const canceler = vi.fn();
      return {
        task: taskStub({ value: `value${taskIndex}`, canceler, delayMs: 2 }),
        canceler,
      };
    });

    const allTask = all(taskData.map((_) => _.task));
    const report = runReportTask(allTask);
    report.cancelerRef.current();

    taskData.forEach(({ canceler }) => {
      expect(canceler).toHaveBeenCalledTimes(1);
    });
    await report.finished;
  });
  it('should resolve array of values', async () => {
    const allTask = all([
      taskStub<'value1', 'error1'>({ delayMs: 1, value: 'value1' }),
      taskStub<'value2', 'error2'>({ delayMs: 1, value: 'value2' }),
      taskStub<'value3', 'error3'>({ delayMs: 1, value: 'value3' }),
    ]);
    assertType<typeof allTask, Task<['value1', 'value2', 'value3'], 'error1' | 'error2' | 'error3'>>(true);
    await expectTask(allTask).toResolve(['value1', 'value2', 'value3']);
  });
  it('should handle iterable values', async () => {
    const taskArray = [
      taskStub({ delayMs: 1, value: 'value1' }),
      taskStub({ delayMs: 1, value: 'value2' }),
      taskStub({ delayMs: 1, value: 'value3' }),
    ];
    const allTask = all({
      [Symbol.iterator]: () => taskArray[Symbol.iterator](),
    });
    await expectTask(allTask).toResolve(['value1', 'value2', 'value3']);
  });
});
