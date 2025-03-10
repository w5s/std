import type { Task, TaskLike } from '../Task.js';
import { from } from './from.js';

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
 * Task.orElse(failure, (error) => Task.reject(`${value}_caught`));// Task.reject('PreviousError_caught')
 * ```
 * @param task - a Task object
 * @param fn - the error mapper function
 */
export function orElse<ValueFrom, ErrorFrom, ValueTo, ErrorTo>(
  task: TaskLike<ValueFrom, ErrorFrom>,
  fn: (error: ErrorFrom) => TaskLike<ValueTo, ErrorTo>,
): Task<ValueFrom | ValueTo, ErrorTo> {
  return from((parameters) =>
    parameters.execute(task, {
      reject: (error) => parameters.execute(fn(error), parameters),
      resolve: parameters.resolve,
    }),
  );
}
