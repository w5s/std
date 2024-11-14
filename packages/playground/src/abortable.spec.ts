import { describe, it, expect } from 'vitest';
import { FakeTask, withTask } from '@w5s/task/dist/Testing.js';
import { abortable, AbortError } from './abortable.js';

describe(abortable, () => {
  const expectTask = withTask(expect);

  it('aborts a task', async () => {
    const task = FakeTask({
      delayMs: 1,
      value: 'my value',
    });
    const abortController = new AbortController();
    const abortTask = abortable(task, abortController);

    const expectation = expectTask(abortTask).toReject(AbortError());
    abortController.abort();
    await expectation;
  });
});