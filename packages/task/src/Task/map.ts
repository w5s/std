import type { Task, TaskLike } from '../Task.js';
import { from } from './from.js';

/**
 * Maps a `Task<Value, Error>` to `Task<NewValue, Error>` by applying a function to a success value, leaving a failure untouched.
 * This function can be used to compose the results of two functions.
 *
 * @example
 * ```typescript
 * const task = Task.resolve('foo');
 * Task.map(task, (value) => `${value}_bar`));// Task.resolve('foo_bar')
 * ```
 * @param task - a Task object
 * @param fn - the mapper function
 */
export function map<ValueFrom, ErrorFrom, ValueTo>(
  task: TaskLike<ValueFrom, ErrorFrom>,
  fn: (value: ValueFrom) => ValueTo,
): Task<ValueTo, ErrorFrom> {
  return from(({ execute, resolve, reject }) => execute(task, { resolve: (value) => resolve(fn(value)), reject }));
}
