import type { Task } from '../Task.js';
import { from } from './from.js';

/**
 * Constructor that always returns a failed `Task` that rejects `error`.
 * This is a shorthand for `Task(({ error }) => error(errorValue))`
 *
 * @example
 * ```typescript
 * const task = Task.reject(1);
 * const result = Task.unsafeRun(task);// Result.Error(1)
 * ```
 * @category Constructor
 */
export function reject<Value = never>(): Task<Value, void>;
/**
 *
 * @example
 * @param errorValue - the error value
 */
export function reject<Value = never, Error = never>(errorValue: Error): Task<Value, Error>;
export function reject<Value = never>(errorValue?: unknown): Task<Value, unknown> {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  return from(({ reject }) => reject(errorValue));
}
