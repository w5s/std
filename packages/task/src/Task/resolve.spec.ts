import { assertType } from '@w5s/core-type';
import { describe, expect, it } from 'vitest';

import type { Task } from '../Task.js';

import { withTask } from '../Testing.js';
import { resolve } from './resolve.js';

describe(resolve, () => {
  const anyValue = 'anyValue';
  const expectTask = withTask(expect);

  it('constructs a sync task', async () => {
    const task = resolve(anyValue);
    expectTask(task).toResolveSync(anyValue);
  });
  it('resolves void task', async () => {
    const task = resolve();
    assertType<typeof task, Task<void, never>>(true);
    expectTask(task).toResolveSync(undefined);
  });
});
