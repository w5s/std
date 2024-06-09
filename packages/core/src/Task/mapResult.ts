import type { Result } from '../Result.js';
import { Error } from '../Result/Error.js';
import { Ok } from '../Result/Ok.js';
import type { Task, TaskLike, TaskParameters } from '../Task.js';
import { from } from './from.js';

const complete = <V, E>(parameters: TaskParameters<V, E>, result: Result<V, E>) =>
  result.ok ? parameters.resolve(result.value) : parameters.reject(result.error);

/**
 * Maps a `Task<ValueFrom, ErrorFrom>` to `Task<ValueTo, ErrorTo>` by applying a function to the result of the task.
 *
 * @example
 * ```ts
 * const task = Task.reject('error');
 * const handledTask = Task.mapResult(task, (result) =>
 *    Result.isOk(result) ? result : Result.Ok('handled_value') )
 * ); // Task.resolve('handled_value')
 * ```
 * @param task - A task
 * @param mapFn - A result mapper function
 */
export function mapResult<ValueFrom, ErrorFrom, ValueTo, ErrorTo>(
  task: TaskLike<ValueFrom, ErrorFrom>,
  mapFn: (result: Result<ValueFrom, ErrorFrom>) => Result<ValueTo, ErrorTo>
): Task<ValueTo, ErrorTo> {
  return from((parameters) =>
    task.taskRun({
      ...parameters,
      reject: (error) => complete(parameters, mapFn(Error(error))),
      resolve: (value) => complete(parameters, mapFn(Ok(value))),
    })
  );
}
