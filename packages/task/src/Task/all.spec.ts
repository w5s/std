import { describe, expect, it, vi } from 'vitest';
import { assertType } from '@w5s/core-type';
import { all } from './all.js';
import { FakeTask, withTask } from '../Testing.js';
import type { Task } from '../Task.js';
import { __run } from './__run.js';

describe(all, () => {
  const expectTask = withTask(expect);

  it('should return empty array if empty', async () => {
    const allTask = all([]);
    expectTask(allTask).toResolveSync([]);
  });
  it('should reject first error', async () => {
    const allTask = all([
      FakeTask({ delayMs: 1, value: 'value1' }),
      FakeTask({ delayMs: 1, error: 'error1' }),
      FakeTask({ delayMs: 1, value: 'value2' }),
      FakeTask({ delayMs: 1, error: 'error2' }),
    ]);
    await expectTask(allTask).toRejectAsync('error1');
  });

  it('should cancel other tasks', async () => {
    const taskCount = 4;
    const taskData = Array.from({ length: taskCount }).map((_, taskIndex) => {
      const canceler = vi.fn();
      return {
        task:
          taskIndex === 0
            ? FakeTask({ delayMs: 1, error: `error${taskIndex}`, canceler })
            : FakeTask({ delayMs: 100, value: `value${taskIndex}`, canceler }),
        canceler,
      };
    });
    const allTask = all(taskData.map((_) => _.task));
    await expectTask(allTask).toRejectAsync('error0');

    taskData.forEach(({ canceler }, cancelerIndex) => {
      expect(canceler).toHaveBeenCalledTimes(cancelerIndex === 0 ? 0 : 1);
    });
  });
  it('should cancel every tasks when canceled', async () => {
    const taskCount = 4;
    const taskData = Array.from({ length: taskCount }).map((_, taskIndex) => {
      const canceler = vi.fn();
      return {
        task: FakeTask({ value: `value${taskIndex}`, canceler, delayMs: 2 }),
        canceler,
      };
    });

    const allTask = all(taskData.map((_) => _.task));
    const controller = new AbortController();
    const result = __run(allTask, controller.signal);
    controller.abort();

    taskData.forEach(({ canceler }) => {
      expect(canceler).toHaveBeenCalledTimes(1);
    });
    await result;
  });
  it('should resolve array of values', async () => {
    const allTask = all([
      FakeTask<'value1', 'error1'>({ delayMs: 1, value: 'value1' }),
      FakeTask<'value2', 'error2'>({ delayMs: 1, value: 'value2' }),
      FakeTask<'value3', 'error3'>({ delayMs: 1, value: 'value3' }),
    ]);
    assertType<typeof allTask, Task<['value1', 'value2', 'value3'], 'error1' | 'error2' | 'error3'>>(true);
    await expectTask(allTask).toResolveAsync(['value1', 'value2', 'value3']);
  });
  it('should handle iterable values', async () => {
    const taskArray = [
      FakeTask({ delayMs: 1, value: 'value1' }),
      FakeTask({ delayMs: 1, value: 'value2' }),
      FakeTask({ delayMs: 1, value: 'value3' }),
    ];
    const allTask = all({
      [Symbol.iterator]: () => taskArray[Symbol.iterator](),
    });
    await expectTask(allTask).toResolveAsync(['value1', 'value2', 'value3']);
  });
});
