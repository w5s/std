import type { TaskLike } from '../Task.js';
import { Task } from './Task.js';

/**
 * Create a Task from a `taskRun` function or a TaskLike
 *
 * @example
 * ```typescript
 * const task = Task.from((resolve) => resolve('hello'));// from a callback
 * const task = Task.from({ taskRun: (resolve) => resolve('hello') });// from a TaskLike
 * ```
 * @param taskLike
 */
export function from<Value, Error>(
  taskLike: TaskLike<Value, Error> | TaskLike<Value, Error>['taskRun'],
): Task<Value, Error> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return taskLike instanceof Task
    ? taskLike
    : new Task<Value, Error>(typeof taskLike === 'function' ? taskLike : taskLike.taskRun);
}
