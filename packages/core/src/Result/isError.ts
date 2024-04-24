import type { Result } from '../Result.js';
import { isOk } from './isOk.js';

/**
 * Return `true` if `anyValue` is {@link Result.Error}
 *
 * @example
 * ```typescript
 * let x = Ok('foo');
 * console.log(Result.isError(x));// false
 *
 * let x = Error('foo');
 * console.log(Result.isError(x));// true
 * ```
 * @category Type
 * @param anyValue - the value to tested
 */
export function isError<V, E>(anyValue: Result<V, E>): anyValue is Result.Error<E> {
  return !isOk(anyValue);
}
