import type { Awaitable } from '@w5s/async';
import { Symbol } from '@w5s/core/dist/Symbol.js';
import type { TaskLike, TaskParameters } from '../Task.js';

/**
 *
 * @example
 * @param task - the task to be called
 * @param parameters - the parameters to call the task with
 */
export function unsafeCall<Value, Error>(
  task: TaskLike<Value, Error>,
  parameters: TaskParameters<Value, Error>,
): Awaitable<void> {
  return task[Symbol.run](parameters);
}
