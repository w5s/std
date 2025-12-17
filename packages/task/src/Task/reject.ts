import type { Task } from '../Task.js';
import { from } from './from.js';

/**
 * Constructor that always returns a failed `Task` that rejects `void`.
 *
 * @example
 * ```typescript
 * const task = Task.reject();
 * const result = Task.run(task);// Result.Error()
 * ```
 * @category Constructor
 */
export function reject<Value = never>(): Task<Value, void>;
/**
 * Constructor that always returns a failed `Task` that rejects `errorValue`.
 * This is a shorthand for `Task(({ error }) => error(errorValue))`
 *
 * @example
 * ```typescript
 * const task = Task.reject(new Error('Something went wrong');
 * const result = Task.run(task);// Result.Error(new Error('Something went wrong'))
 * ```
 * @category Constructor
 * @param errorValue - the error value
 */
export function reject<Value = never, Error = never>(errorValue: Error): Task<Value, Error>;
export function reject<Value = never>(errorValue?: unknown): Task<Value, unknown> {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  return from(({ reject }) => reject(errorValue));
}
