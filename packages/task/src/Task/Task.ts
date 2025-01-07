import type { Awaitable } from '@w5s/async';
import type { Result } from '@w5s/core';
import type { TaskCanceler, Task as TaskInterface, TaskParameters } from '../Task.js';
import { unsafeRun } from './unsafeRun.js';

/**
 * An implementation of {@link @w5s/task!TaskLike}
 */
export class Task<Value, Error> implements TaskInterface<Value, Error> {
  constructor(public readonly taskRun: (parameters: TaskParameters<Value, Error>) => Awaitable<void>) {}

  run(canceler?: TaskCanceler): Awaitable<Result<Value, Error>> {
    return unsafeRun(this, canceler);
  }
}
