import type { Task, TaskLike } from '../Task.js';
import { from } from './from.js';

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
export function mapError<ValueFrom, ErrorFrom, ErrorTo>(
  task: TaskLike<ValueFrom, ErrorFrom>,
  fn: (error: ErrorFrom) => ErrorTo
): Task<ValueFrom, ErrorTo> {
  return from((parameters) => task.taskRun({ ...parameters, reject: (error) => parameters.reject(fn(error)) }));
}
