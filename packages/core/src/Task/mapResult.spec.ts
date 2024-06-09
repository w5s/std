import { describe, it, expect } from 'vitest';
import { taskStub, withTask } from '../testing.js';
import { mapResult } from './mapResult.js';
import { Result } from '../Result.js';

describe(mapResult, () => {
  const anyError = Object.freeze({ message: 'error message' });
  const anyValue = Object.freeze({ foo: true });
  const expectTask = withTask(expect);

  it('keeps unchanged when success', async () => {
    const task = taskStub<typeof anyValue, typeof anyError>({ value: anyValue });
    const mapTask = mapResult(task, (_) => (_.ok ? Result.Error(_.value) : Result.Ok('Never called')));

    await expectTask(mapTask).toReject(anyValue);
  });
  it('maps error when success', async () => {
    const task = taskStub<typeof anyValue, typeof anyError>({ error: anyError });
    const mapTask = mapResult(task, (_) => (_.ok ? Result.Error('Never called') : Result.Ok(_.error)));

    await expectTask(mapTask).toResolve(anyError);
  });
});
