import { Symbol } from '@w5s/core/dist/Symbol.js';
import type { TaskFunction, TaskLike } from '../Task.js';
import { Task } from './Task.js';

/**
 * Create a Task from a `Symbol.run` function or a TaskLike
 *
 * @example
 * ```typescript
 * const task = Task.from(({ resolve }) => resolve('hello'));// from a callback
 * const task = Task.from({ [Symbol.run]: ({ resolve }) => resolve('hello') });// from a TaskLike
 * ```
 * @param taskLike
 */
export function from<Value, Error>(taskLike: TaskLike<Value, Error> | TaskFunction<Value, Error>): Task<Value, Error> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return taskLike instanceof Task
    ? taskLike
    : new Task<Value, Error>(typeof taskLike === 'function' ? taskLike : taskLike[Symbol.run]);
}
