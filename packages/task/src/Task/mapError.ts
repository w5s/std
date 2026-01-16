import type { Task, TaskLike } from '../Task.js';
import { from } from './from.js';
import { unsafeCall } from './unsafeCall.js';

/**
 * Maps a `Task<Value, ErrorFrom>` to `Task<Value, ErrorTo>` by applying a function to a contained failure error, leaving a success value untouched.
 * This function can be used to pass through a successful result while handling an error.
 *
 * @example
 * ```typescript
 * const task = Task.reject('error');
 * Task.mapError(task, (value) => `${value}_bar`));// Task.reject('error_bar')
 * ```
 * @param self - a Task object
 * @param fn - the error mapper function
 */
export function mapError<ValueFrom, ErrorFrom, ErrorTo>(
  self: TaskLike<ValueFrom, ErrorFrom>,
  fn: (error: ErrorFrom) => ErrorTo,
): Task<ValueFrom, ErrorTo> {
  return from(({ reject, resolve, canceler }) =>
    unsafeCall(self, { reject: (error) => reject(fn(error)), resolve, canceler }),
  );
}
