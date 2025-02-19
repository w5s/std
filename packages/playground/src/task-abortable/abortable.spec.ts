import { describe, it, expect } from 'vitest';
import { FakeTask, withTask } from '@w5s/task/dist/Testing.js';
import { AbortError } from '@w5s/error';
import { abortable } from './abortable.js';

describe(abortable, () => {
  const expectTask = withTask(expect);

  it('aborts a task', async () => {
    const task = FakeTask({
      delayMs: 1,
      value: 'my value',
    });
    const abortController = new AbortController();
    const abortTask = abortable(task, abortController);

    const expectation = expectTask(abortTask).toRejectAsync(AbortError());
    abortController.abort();
    await expectation;
  });
  it('handles already aborted', async () => {
    const task = FakeTask({
      delayMs: 1,
      value: 'my value',
    });
    const abortController = new AbortController();
    abortController.abort();
    const abortTask = abortable(task, abortController);
    expectTask(abortTask).toRejectSync(AbortError());
  });
  it('handles rejected task', async () => {
    const error = new Error('MockError');
    const task = FakeTask({
      delayMs: 1,
      throwError: new Error('MockError'),
    });
    const abortController = new AbortController();
    const abortTask = abortable(task, abortController);
    await expectTask(abortTask).toThrowAsync(error);
  });
});
