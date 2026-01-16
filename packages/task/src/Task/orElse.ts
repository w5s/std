import type { Task, TaskLike } from '../Task.js';
import { from } from './from.js';
import { unsafeCall } from './unsafeCall.js';

/**
 * Calls `fn` if the task is failed, otherwise returns the successful task untouched.
 * This function can be used for control flow based on `Task` values.
 *
 * @example
 * ```typescript
 * const success = Task.resolve('foo');
 * Task.orElse(success, (value) => Task.resolve(`never_used`));// Task.resolve('foo')
 *
 * const failure = Task.reject('PreviousError');
 * Task.orElse(failure, (error) => Task.reject(`${error}_caught`));// Task.reject('PreviousError_caught')
 * ```
 * @param self - a Task object
 * @param fn - the error mapper function
 */
export function orElse<ValueFrom, ErrorFrom, ValueTo, ErrorTo>(
  self: TaskLike<ValueFrom, ErrorFrom>,
  fn: (error: ErrorFrom) => TaskLike<ValueTo, ErrorTo>,
): Task<ValueFrom | ValueTo, ErrorTo> {
  return from((parameters) =>
    unsafeCall(self, {
      reject: (error) => unsafeCall(fn(error), parameters),
      resolve: parameters.resolve,
      canceler: parameters.canceler,
    }),
  );
}
