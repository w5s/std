/* eslint-disable unicorn/prefer-array-from-map */
import { Result } from '@w5s/core';
import { describe, expect, it, vi } from 'vitest';

import { FakeTask, withTask } from '../Testing.js';
import { allSettled } from './allSettled.js';
import { run as taskRun } from './run.js';

describe(allSettled, () => {
  const expectTask = withTask(expect);

  it('should return empty array if empty', async () => {
    const allTask = allSettled([]);
    expectTask(allTask).toResolveSync([]);
  });
  it('should resolve array of results', async () => {
    const anyTask = allSettled([
      FakeTask({ delayMs: 0, value: 'value1' }),
      FakeTask({ delayMs: 0, error: 'error1' }),
      FakeTask({ delayMs: 0, value: 'value2' }),
      FakeTask({ delayMs: 0, error: 'error2' }),
    ]);
    await expectTask(anyTask).toResolveAsync([
      Result.Ok('value1'),
      Result.Error('error1'),
      Result.Ok('value2'),
      Result.Error('error2'),
    ]);
  });
  it('should cancel every tasks when canceled', async () => {
    const taskCount = 4;
    const taskEntries = Array.from({ length: taskCount }).map((_, taskIndex) => {
      const canceler = vi.fn();
      return {
        canceler,
        key: taskIndex,
        task: FakeTask({ canceler, delayMs: 2, value: `value${taskIndex}` }),
      };
    });
    const allTask = allSettled(taskEntries.map(({ task }) => task));
    const controller = new AbortController();
    const result = taskRun(allTask, { signal: controller.signal });
    controller.abort();

    taskEntries.forEach(({ canceler }) => {
      expect(canceler).toHaveBeenCalledTimes(1);
    });
    await result;
  });
});
