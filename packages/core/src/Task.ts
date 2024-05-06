import type { Awaitable } from '@w5s/async';
import type { Option } from './Option.js';
import type { Result } from './Result.js';
import type { Ref } from './Ref.js';
import { create } from './Task/create.js';
import { resolve } from './Task/resolve.js';
import { reject } from './Task/reject.js';
import { all } from './Task/all.js';
import { any } from './Task/any.js';
import { allSettled } from './Task/allSettled.js';
import { map } from './Task/map.js';
import { mapError } from './Task/mapError.js';
import { andThen } from './Task/andThen.js';
import { andRun } from './Task/andRun.js';
import { orElse } from './Task/orElse.js';
import { tryCall } from './Task/tryCall.js';
import { hasInstance } from './Task/hasInstance.js';

/**
 * Interface used to cancel running task
 */
export interface TaskCanceler extends Ref<Option<() => void>> {}

/**
 * A function that runs the task and returns a {@link @w5s/core!Result}
 */
export type TaskRunner = <Value, Error>(
  task: Task<Value, Error>,
  canceler: TaskCanceler
) => Awaitable<Result<Value, Error>>;

/**
 * All context passed to task in order to execute
 */
export interface TaskParameters<Value, Error> {
  /**
   * Resolve callback
   */
  readonly resolve: (value: Value) => void;
  /**
   * Reject callback
   */
  readonly reject: (error: Error) => void;
  /**
   * Reference to cancel function
   */
  readonly canceler: TaskCanceler;
  /**
   * The runner function (to run sub tasks)
   */
  readonly run: TaskRunner;
}

/**
 * A Task interface that represents a lazy computation that will be evaluated later.
 * The result of the computation is a {@link @w5s/core!Result}
 * A task is also cancelable and can run other subtasks
 */
export interface TaskLike<Value, Error> {
  /**
   * A callback with side effects
   */
  readonly taskRun: (parameters: TaskParameters<Value, Error>) => void;
}

/**
 * An implementation of {@link @w5s/core!TaskLike}
 */
export interface Task<Value, Error> {
  /**
   * A callback with side effects
   */
  readonly taskRun: (parameters: TaskParameters<Value, Error>) => void;
}

/**
 * @namespace
 */
export const Task = {
  all,
  allSettled,
  andRun,
  andThen,
  any,
  create,
  hasInstance,
  map,
  mapError,
  orElse,
  reject,
  resolve,
  tryCall,
};

export namespace Task {
  /**
   * Extracts value type of task T
   */
  export type ValueOf<T> = T extends Task<infer V, any> ? V : never;
  /**
   * Extracts error type of task T
   */
  export type ErrorOf<T> = T extends Task<any, infer Error> ? Error : never;
}
