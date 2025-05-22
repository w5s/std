import type { Option } from '../Option.js';
import type { Result } from '../Result.js';
import { isError } from './isError.js';

/**
 * Returns the `error` if {@link Result.Error}, {@link Option.None} if {@link Result.Ok}
 *
 * @example
 * ```typescript
 * let x = Ok('foo');
 * Result.getError(x);// Option.None
 *
 * let x = Error('foo');
 * Result.getError(x);// Option.Some('foo')
 * ```
 * @category Accessor
 * @param self - a Result object
 */
export function getError<E>(self: Result.Error<E> | Result<never, E>): Option.Some<E>;
export function getError(self: Result.Ok<unknown> | Result<unknown, never>): Option.None;
export function getError<E>(self: Result<unknown, E>): Option<E>;
export function getError<E>(self: Result<unknown, E>): Option<E> {
  return isError(self) ? self.error : undefined;
}
