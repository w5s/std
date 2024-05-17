import type { Task } from '@w5s/core/dist/Task/Task.js';
import { from } from '@w5s/core/dist/Task/from.js';
import type { Time } from './Time.js';

/**
 * A task that resolves the current time in milliseconds.
 *
 * @example
 * ```typescript
 * const program = () => Task.andThen(Time.now(), (currentTime) => {
 *   // use currentTime
 * });
 * ```
 */
export function now(): Task<Time, never> {
  return from<Time, never>(({ resolve }) => resolve(Date.now() as Time));
}
