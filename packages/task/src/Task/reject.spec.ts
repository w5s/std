import { assertType } from '@w5s/core-type';
import { describe, expect, it } from 'vitest';

import type { Task } from '../Task.js';

import { withTask } from '../Testing.js';
import { reject } from './reject.js';

describe(reject, () => {
  const anyError = 'anyError';
  const expectTask = withTask(expect);

  it('should construct a sync task', async () => {
    const task = reject(anyError);
    expectTask(task).toRejectSync(anyError);
  });
  it('should reject void task', async () => {
    const task = reject();
    assertType<typeof task, Task<never, void>>(true);
    expectTask(task).toRejectSync(undefined);
  });
});
