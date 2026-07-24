import type { Task } from '../Task.js';

import { map } from './map.js';

/**
 * Ignores value of task
 *
 * @example
 * ```typescript
 * const task = Task.resolve('foo');
 * Task.ignore(task);// Task.resolve()
 * ```
 * @param self the Task object
 */
export function ignore<Error>(self: Task<unknown, Error>): Task<void, Error> {
  return map(self, ignoreValue);
}

function ignoreValue(_anyValue: unknown): void {}
