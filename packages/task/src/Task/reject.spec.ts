import { describe, it, expect } from 'vitest';
import { assertType } from '@w5s/core-type';
import { reject } from './reject.js';
import { withTask } from '../Testing.js';
import type { Task } from '../Task.js';

describe(reject, () => {
  const anyError = 'anyError';
  const expectTask = withTask(expect);

  it('should construct a sync task', async () => {
    const task = reject(anyError);
    await expectTask(task).toReject(anyError);
  });
  it('should reject void task', async () => {
    const task = reject();
    assertType<typeof task, Task<never, void>>(true);
    await expectTask(task).toReject(undefined);
  });
});
