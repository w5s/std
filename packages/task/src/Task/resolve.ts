import type { Task } from '../Task.js';
import { from } from './from.js';

/**
 * Constructor that always returns a successful `Task` that resolves `value`.
 * This is a shorthand for `Task.from(({ resolve }) => resolve(value))`
 *
 * @example
 * ```typescript
 * const task = Task.resolve(1);
 * const result = Task.run(task);// Result.Ok(1)
 * ```
 * @category Constructor
 */
export function resolve<Error = never>(): Task<void, Error>;
/**
 *
 * @example
 * @param value - the success value
 */
export function resolve<Value, Error = never>(value: Value): Task<Value, Error>;
export function resolve<Error = never>(value?: unknown): Task<unknown, Error> {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  return from(({ resolve }) => resolve(value));
}
