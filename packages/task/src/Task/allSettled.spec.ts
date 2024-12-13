import { describe, it, expect } from 'vitest';
import { Result } from '@w5s/core';
import { allSettled } from './allSettled.js';
import { FakeTask, withTask } from '../Testing.js';

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
});
