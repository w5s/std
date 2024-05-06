import type { Task, TaskLike } from '../Task.js';
import { wrap } from './wrap.js';

/**
 * Maps a `Task<Value, ErrorFrom>` to `Task<Value, ErrorTo>` by applying a function to a contained failure error, leaving a success value untouched.
 * This function can be used to pass through a successful result while handling an error.
 *
 * @example
 * ```typescript
 * const task = Task.reject('error');
 * Task.mapError(task, (value) => `${value}_bar`));// Task.reject('error_bar')
 * ```
 * @param task - a Task object
 * @param fn - the error mapper function
 */
export function mapError<Value, ErrorFrom, ErrorTo>(
  task: TaskLike<Value, ErrorFrom>,
  fn: (error: ErrorFrom) => ErrorTo
): Task<Value, ErrorTo> {
  return wrap((parameters) => task.taskRun({ ...parameters, reject: (error) => parameters.reject(fn(error)) }));
}
