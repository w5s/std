import { describe, it, expect, vi } from 'vitest';
import { AggregateError } from '@w5s/error';
import { assertType } from '@w5s/core-type';
import { any } from './any.js';
import { FakeTask, withTask } from '../Testing.js';
import type { Task } from '../Task.js';
import { runReportTask } from './_stub.spec.js';

describe(any, () => {
  const expectTask = withTask(expect);

  it('should return empty array if empty', async () => {
    const anyTask = any([]);
    await expectTask(anyTask).toReject(AggregateError([]));
  });
  it('should resolve first value', async () => {
    const anyTask = any([
      FakeTask({ delayMs: 1, value: 'value1' }),
      FakeTask({ delayMs: 1, error: 'error1' }),
      FakeTask({ delayMs: 1, value: 'value2' }),
      FakeTask({ delayMs: 1, error: 'error2' }),
    ]);
    await expectTask(anyTask).toResolve('value1');
  });

  it('should cancel other tasks', async () => {
    const taskCount = 4;
    const taskData = Array.from({ length: taskCount }).map((_, taskIndex) => {
      const canceler = vi.fn();
      return {
        task:
          taskIndex === 0
            ? FakeTask({ delayMs: 1, value: `value${taskIndex}`, canceler })
            : FakeTask({ delayMs: 100, error: `error${taskIndex}`, canceler }),
        canceler,
      };
    });
    const anyTask = any(taskData.map((_) => _.task));

    await expectTask(anyTask).toResolve('value0');

    taskData.forEach(({ canceler }, cancelerIndex) => {
      expect(canceler).toHaveBeenCalledTimes(cancelerIndex === 0 ? 0 : 1);
    });
  });
  it('should cancel every tasks when canceled', async () => {
    const taskCount = 4;
    const taskData = Array.from({ length: taskCount }).map((_, taskIndex) => {
      const canceler = vi.fn();
      return {
        task: FakeTask({ delayMs: 2, value: `value${taskIndex}`, canceler }),
        canceler,
      };
    });

    const anyTask = any(taskData.map((_) => _.task));
    const report = runReportTask(anyTask);
    report.cancelerRef.current();

    taskData.forEach(({ canceler }) => {
      expect(canceler).toHaveBeenCalledTimes(1);
    });
    await report.finished;
  });
  it('should reject an aggregate of errors', async () => {
    const anyTask = any([
      FakeTask<'value1', 'error1'>({ delayMs: 1, error: 'error1' }),
      FakeTask<'value2', 'error2'>({ delayMs: 1, error: 'error2' }),
      FakeTask<'value3', 'error3'>({ delayMs: 1, error: 'error3' }),
    ]);
    assertType<typeof anyTask, Task<'value1' | 'value2' | 'value3', AggregateError<['error1', 'error2', 'error3']>>>(
      true,
    );
    await expectTask(anyTask).toReject(AggregateError(['error1', 'error2', 'error3']));
  });
  it('should handle iterable values', async () => {
    const taskArray = [
      FakeTask({ delayMs: 1, value: 'value1' }),
      FakeTask({ delayMs: 0, value: 'value2' }),
      FakeTask({ delayMs: 1, value: 'value3' }),
    ];
    const anyTask = any({
      [Symbol.iterator]: () => taskArray[Symbol.iterator](),
    });
    await expectTask(anyTask).toResolve('value2');
  });
});
