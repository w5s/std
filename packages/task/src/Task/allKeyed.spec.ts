import { describe, expect, it, vi } from 'vitest';
import { assertType } from '@w5s/core-type';
import { allKeyed } from './allKeyed.js';
import { run as taskRun } from './run.js';
import { FakeTask, withTask } from '../Testing.js';
import type { Task } from '../Task.js';

describe(allKeyed, () => {
  const expectTask = withTask(expect);

  it('should return empty array if empty', async () => {
    const allTask = allKeyed({});
    expectTask(allTask).toResolveSync({});
  });
  it('should reject first error', async () => {
    const allTask = allKeyed({
      task1: FakeTask({ delayMs: 1, value: 'value1' }),
      task2: FakeTask({ delayMs: 1, error: 'error1' }),
      task3: FakeTask({ delayMs: 1, value: 'value2' }),
      task4: FakeTask({ delayMs: 1, error: 'error2' }),
    });
    await expectTask(allTask).toRejectAsync('error1');
  });

  it('should cancel other tasks', async () => {
    const taskCount = 4;
    const taskData = Array.from({ length: taskCount }).map((_, taskIndex) => {
      const canceler = vi.fn();
      return {
        key: `task${taskIndex}`,
        task:
          taskIndex === 0
            ? FakeTask({ delayMs: 1, error: `error${taskIndex}`, canceler })
            : FakeTask({ delayMs: 100, value: `value${taskIndex}`, canceler }),
        canceler,
      };
    });
    const allTask = allKeyed(Object.fromEntries(taskData.map(({ key, task }) => [key, task])));
    await expectTask(allTask).toRejectAsync('error0');

    taskData.forEach(({ canceler }, cancelerIndex) => {
      expect(canceler).toHaveBeenCalledTimes(cancelerIndex === 0 ? 0 : 1);
    });
  });
  it('should cancel every tasks when canceled', async () => {
    const taskCount = 4;
    const taskEntries = Array.from({ length: taskCount }).map((_, taskIndex) => {
      const canceler = vi.fn();
      return {
        key: `task${taskIndex}`,
        task: FakeTask({ value: `value${taskIndex}`, canceler, delayMs: 2 }),
        canceler,
      };
    });
    const allTask = allKeyed(Object.fromEntries(taskEntries.map(({ key, task }) => [key, task])));
    const controller = new AbortController();
    const result = taskRun(allTask, { signal: controller.signal });
    controller.abort();

    taskEntries.forEach(({ canceler }) => {
      expect(canceler).toHaveBeenCalledTimes(1);
    });
    await result;
  });
  it('should resolve array of values', async () => {
    const allTask = allKeyed({
      task1: FakeTask<'value1', 'error1'>({ delayMs: 1, value: 'value1' }),
      task2: FakeTask<'value2', 'error2'>({ delayMs: 1, value: 'value2' }),
      task3: FakeTask<'value3', 'error3'>({ delayMs: 1, value: 'value3' }),
    });
    assertType<
      typeof allTask,
      Task<
        {
          task1: 'value1';
          task2: 'value2';
          task3: 'value3';
        },
        'error1' | 'error2' | 'error3'
      >
    >(true);
    await expectTask(allTask).toResolveAsync({
      task1: 'value1',
      task2: 'value2',
      task3: 'value3',
    });
  });
});
