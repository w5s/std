import { describe, it, expect } from 'vitest';
import { Result } from '@w5s/core';
import { FakeTask, withTask } from '../Testing.js';
import { mapResult } from './mapResult.js';

describe(mapResult, () => {
  const anyError = Object.freeze({ message: 'error message' });
  const anyValue = Object.freeze({ foo: true });
  const expectTask = withTask(expect);

  it('keeps unchanged when success', async () => {
    const task = FakeTask<typeof anyValue, typeof anyError>({ value: anyValue });
    const mapTask = mapResult(task, (_) => (_.ok ? Result.Error(_.value) : Result.Ok('Never called')));

    expectTask(mapTask).toRejectSync(anyValue);
  });
  it('maps error when success', async () => {
    const task = FakeTask<typeof anyValue, typeof anyError>({ error: anyError });
    const mapTask = mapResult(task, (_) => (_.ok ? Result.Error('Never called') : Result.Ok(_.error)));

    expectTask(mapTask).toResolveSync(anyError);
  });
});
