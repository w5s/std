import type { Task, TaskLike } from '../Task.js';
import { wrap } from './wrap.js';

/**
 * Calls `fn` if the task is successful, otherwise returns the failed task untouched.
 * This function can be used for control flow based on `Task` values.
 *
 * @example
 * ```typescript
 * const success = Task.resolve('foo');
 * Task.andThen(success, (value) => Task.resolve(`${value}_then`));// Task.resolve('foo_then')
 *
 * const failure = Task.reject('PreviousError');
 * Task.andThen(failure, (value) => Task.resolve(`never_used`));// Task.reject('PreviousError')
 * ```
 * @param task - a Task object
 * @param fn - the value mapper function
 */
export function andThen<ValueFrom, ErrorFrom, ValueTo, ErrorTo>(
  task: TaskLike<ValueFrom, ErrorFrom>,
  fn: (value: ValueFrom) => TaskLike<ValueTo, ErrorTo>
): Task<ValueTo, ErrorFrom | ErrorTo> {
  return wrap((parameters) => task.taskRun({ ...parameters, resolve: (value) => fn(value).taskRun(parameters) }));
}
