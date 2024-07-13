import { describe, it, expect } from 'vitest';
import { resolve } from './resolve.js';
import { assertType, withTask } from '../Testing.js';
import type { Task } from '../Task.js';

describe(resolve, () => {
  const anyValue = 'anyValue';
  const expectTask = withTask(expect);

  it('constructs a sync task', async () => {
    const task = resolve(anyValue);
    await expectTask(task).toResolve(anyValue);
  });
  it('resolves void task', async () => {
    const task = resolve();
    assertType<typeof task, Task<void, never>>(true);
    await expectTask(task).toResolve(undefined);
  });
});
