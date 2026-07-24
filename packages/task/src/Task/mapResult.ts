import type { Result } from '@w5s/core';

import type { Task, TaskLike, TaskParameters } from '../Task.js';

import { error } from './error.js';
import { from } from './from.js';
import { ok } from './ok.js';
import { unsafeCall } from './unsafeCall.js';

const complete = <V, E>({ reject, resolve }: TaskParameters<V, E>, result: Result<V, E>) =>
  result.ok ? resolve(result.value) : reject(result.error);

/**
 * Maps a `Task<ValueFrom, ErrorFrom>` to `Task<ValueTo, ErrorTo>` by applying a function to the result of the task.
 *
 * @example
 * ```typescript
 * const task = Task.reject('error');
 * const handledTask = Task.mapResult(task, (result) =>
 *    Result.isOk(result) ? result : Result.Ok('handled_value') )
 * ); // Task.resolve('handled_value')
 * ```
 * @param self A task
 * @param mapFn A result mapper function
 */
export function mapResult<ValueFrom, ErrorFrom, ValueTo, ErrorTo>(
  self: TaskLike<ValueFrom, ErrorFrom>,
  mapFn: (result: Result<ValueFrom, ErrorFrom>) => Result<ValueTo, ErrorTo>,
): Task<ValueTo, ErrorTo> {
  return from((parameters) =>
    unsafeCall(self, {
      canceler: parameters.canceler,
      reject: (error_) => complete(parameters, mapFn(error(error_))),
      resolve: (value) => complete(parameters, mapFn(ok(value))),
    }),
  );
}
