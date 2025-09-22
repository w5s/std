import type { Awaitable } from '@w5s/async';
import type { Result } from '@w5s/core';
import { Symbol } from '@w5s/core/dist/Symbol.js';
import type { TaskCanceler, TaskFunction, Task as TaskInterface } from '../Task.js';
import { run as taskRun } from './run.js';

const $run = Symbol.run;
/**
 * An implementation of {@link @w5s/task!TaskLike}
 */
export class Task<Value, Error> implements TaskInterface<Value, Error> {
  [$run]: TaskFunction<Value, Error>;

  constructor(runFn: TaskFunction<Value, Error>) {
    this[$run] = runFn;
  }

  run(canceler?: TaskCanceler): Awaitable<Result<Value, Error>> {
    return taskRun(this, canceler);
  }
}
