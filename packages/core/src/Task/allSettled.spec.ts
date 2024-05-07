import { describe, it, expect } from 'vitest';
import { allSettled } from './allSettled.js';
import { taskStub, withTask } from '../testing.js';
import { Result } from '../Result.js';

describe(allSettled, () => {
  const expectTask = withTask(expect);

  it('should return empty array if empty', async () => {
    const allTask = allSettled([]);
    await expectTask(allTask).toResolve([]);
  });
  it('should resolve array of results', async () => {
    const anyTask = allSettled([
      taskStub({ delayMs: 0, value: 'value1' }),
      taskStub({ delayMs: 0, error: 'error1' }),
      taskStub({ delayMs: 0, value: 'value2' }),
      taskStub({ delayMs: 0, error: 'error2' }),
    ]);
    await expectTask(anyTask).toResolve([
      Result.Ok('value1'),
      Result.Error('error1'),
      Result.Ok('value2'),
      Result.Error('error2'),
    ]);
  });
});
