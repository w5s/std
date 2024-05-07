import type { Task, TaskLike } from '../Task.js';

/**
 * Create a Task from a `taskRun` function or a TaskLike
 *
 * @example
 * @param taskRun
 */
export function from<Value, Error>(
  taskLike: TaskLike<Value, Error> | TaskLike<Value, Error>['taskRun']
): Task<Value, Error> {
  return {
    taskRun: typeof taskLike === 'function' ? taskLike : taskLike.taskRun,
  };
}
