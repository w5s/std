import type { Task } from '../Task.js';
import { map } from './map.js';

function ignoreValue(_anyValue: unknown): void {}

/**
 * Ignores value of task
 *
 * @example
 * ```typescript
 * const task = Task.resolve('foo');
 * Task.ignore(task);// Task.resolve()
 * ```
 */
export function ignore<Error>(task: Task<unknown, Error>): Task<void, Error> {
  return map(task, ignoreValue);
}
