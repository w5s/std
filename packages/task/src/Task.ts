import type { Awaitable } from '@w5s/async';
import type { Option, Result, Ref } from '@w5s/core';
import type { Symbol } from '@w5s/core/dist/Symbol.js';
import type { PartialKeys } from '@w5s/core-type';
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
import { run } from './Task/run.js';
import { from } from './Task/from.js';
import { mapResult } from './Task/mapResult.js';
import { ignore } from './Task/ignore.js';

/**
 * Interface used to cancel running task
 */
export interface TaskCanceler extends Ref<Option<() => void>> {}

/**
 * A function that runs the task and returns a {@link @w5s/core!Result}
 */
export type TaskRunner = <Value, Error>(
  task: TaskLike<Value, Error>,
  canceler: TaskCanceler,
) => Awaitable<Result<Value, Error>>;

export interface TaskParametersOverrides<Value, Error>
  extends PartialKeys<Pick<TaskParameters<Value, Error>, 'resolve' | 'reject' | 'canceler'>, 'canceler'> {}

/**
 * All context passed to task in order to execute
 */
export interface TaskParameters<Value, Error> {
  /**
   * Resolve callback
   */
  readonly resolve: (value: Value) => Awaitable<void>;
  /**
   * Reject callback
   */
  readonly reject: (error: Error) => Awaitable<void>;
  /**
   * Reference to cancel function
   */
  readonly canceler: TaskCanceler;
  /**
   * The execute function to run task or subtask injecting parameters
   */
  readonly execute: <V, E>(task: TaskLike<V, E>, overrides: TaskParametersOverrides<V, E>) => Awaitable<void>;
}

export type TaskFunction<Value, Error> = (parameters: TaskParameters<Value, Error>) => Awaitable<void>;

/**
 * A Task interface that represents a lazy computation that will be evaluated later.
 * The result of the computation is a {@link @w5s/core!Result}
 * A task is also cancelable and can run other subtasks
 */
export interface TaskLike<Value, Error> {
  /**
   * A callback with side effects
   */
  readonly [Symbol.run]: TaskFunction<Value, Error>;
}

/**
 * An implementation of {@link @w5s/task!TaskLike}
 */
export interface Task<Value, Error> extends TaskLike<Value, Error> {
  /**
   * Shorthand to run the current task
   *
   * @param canceler
   */
  run(canceler?: TaskCanceler): Awaitable<Result<Value, Error>>;
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
  from,
  hasInstance,
  ignore,
  map,
  mapError,
  mapResult,
  orElse,
  reject,
  resolve,
  tryCall,
  run,
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
