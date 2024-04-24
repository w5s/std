import type { Option } from '../Option.js';
import type { Result } from '../Result.js';
import { isError } from './isError.js';

/**
 * Returns the `value` if {@link Result.Ok}, {@link Option.None} if {@link Result.Error}
 *
 * @example
 * ```typescript
 * let x = Ok('foo');
 * Result.get(x);// Option.Some('foo')
 *
 * let x = Error('foo');
 * Result.get(x);// Option.None
 * ```
 * @category Accessor
 * @param result - a Result object
 */
export function get<V>(result: Result.Ok<V> | Result<V, never>): Option.Some<V>;
export function get(result: Result.Error<unknown> | Result<never, unknown>): Option.None;
export function get<V>(result: Result<V, unknown>): Option<V>;
export function get<V>(result: Result<V, unknown>): Option<V> {
  return isError(result) ? undefined : result.value;
}
