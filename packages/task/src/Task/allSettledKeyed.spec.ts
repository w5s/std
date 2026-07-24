/* eslint-disable unicorn/prefer-array-from-map */
import { Result } from '@w5s/core';
import { assertType } from '@w5s/core-type';
import { describe, expect, it, vi } from 'vitest';

import type { Task } from '../Task.js';

import { FakeTask, withTask } from '../Testing.js';
import { allSettledKeyed } from './allSettledKeyed.js';
import { run as taskRun } from './run.js';

describe(allSettledKeyed, () => {
  const expectTask = withTask(expect);

  it('should return empty array if empty', async () => {
    const allTask = allSettledKeyed({});
    expectTask(allTask).toResolveSync({});
  });
  it('resolves a record of results', async () => {
    const allTask = allSettledKeyed({
      task1: FakeTask({ delayMs: 1, value: 'value1' as const }),
      task2: FakeTask({ delayMs: 1, error: 'error1' as const }),
      task3: FakeTask({ delayMs: 1, value: 'value2' as const }),
      task4: FakeTask({ delayMs: 1, error: 'error2' as const }),
    });
    assertType<
      typeof allTask,
      Task<
        {
          task1: Result<'value1', any>;
          task2: Result<any, 'error1'>;
          task3: Result<'value2', any>;
          task4: Result<any, 'error2'>;
        },
        never
      >
    >(true);
    await expectTask(allTask).toResolveAsync({
      task1: Result.Ok('value1'),
      task2: Result.Error('error1'),
      task3: Result.Ok('value2'),
      task4: Result.Error('error2'),
    });
  });

  it('should cancel every tasks when canceled', async () => {
    const taskCount = 4;
    const taskEntries = Array.from({ length: taskCount }).map((_, taskIndex) => {
      const canceler = vi.fn();
      return {
        canceler,
        key: `task${taskIndex}`,
        task: FakeTask({ canceler, delayMs: 2, value: `value${taskIndex}` }),
      };
    });
    const allTask = allSettledKeyed(Object.fromEntries(taskEntries.map(({ key, task }) => [key, task])));
    const controller = new AbortController();
    const result = taskRun(allTask, { signal: controller.signal });
    controller.abort();

    taskEntries.forEach(({ canceler }) => {
      expect(canceler).toHaveBeenCalledTimes(1);
    });
    await result;
  });
});
