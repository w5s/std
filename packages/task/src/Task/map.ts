import type { Task, TaskLike } from '../Task.js';
import { from } from './from.js';
import { unsafeCall } from './unsafeCall.js';

/**
 * Maps a `Task<Value, Error>` to `Task<NewValue, Error>` by applying a function to a success value, leaving a failure untouched.
 * This function can be used to compose the results of two functions.
 *
 * @example
 * ```typescript
 * const task = Task.resolve('foo');
 * Task.map(task, (value) => `${value}_bar`));// Task.resolve('foo_bar')
 * ```
 * @param self - a Task object
 * @param fn - the mapper function
 */
export function map<ValueFrom, ErrorFrom, ValueTo>(
  self: TaskLike<ValueFrom, ErrorFrom>,
  fn: (value: ValueFrom) => ValueTo,
): Task<ValueTo, ErrorFrom> {
  return from(({ resolve, reject, canceler }) =>
    unsafeCall(self, { resolve: (value) => resolve(fn(value)), reject, canceler }),
  );
}
