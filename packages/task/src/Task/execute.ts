import type { Awaitable } from '@w5s/async';
import { Symbol } from '@w5s/core/dist/Symbol.js';
import type { TaskLike, TaskParameters } from '../Task.js';

/**
 *
 * @example
 * @param task
 * @param context
 */
export function execute<Value, Error>(
  task: TaskLike<Value, Error>,
  context: TaskParameters<Value, Error>,
): Awaitable<void> {
  return task[Symbol.run](context);
}
