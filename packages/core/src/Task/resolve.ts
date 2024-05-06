import type { Task } from '../Task.js';
import { wrap } from './wrap.js';

/**
 * Constructor that always returns a successful `Task` that resolves `value`.
 * This is a shorthand for `Task(({ ok }) => ok(value))`
 *
 * @example
 * ```typescript
 * const task = Task.resolve(1);
 * const result = unsafeRun(task);// Result.Ok(1)
 * ```
 * @category Constructor
 * @param value - the success value
 */
export function resolve<Error = never>(): Task<void, Error>;
export function resolve<Value, Error = never>(value: Value): Task<Value, Error>;
export function resolve<Error = never>(value?: unknown): Task<unknown, Error> {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  return wrap(({ resolve }) => resolve(value));
}
