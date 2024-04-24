import type { Result } from '../Result.js';

/**
 * Return `true` if `anyValue` is {@link Result.Ok}
 *
 * @example
 * ```typescript
 * let x = Ok('foo');
 * console.log(isOk(x));// true
 *
 * let x = Error('foo');
 * console.log(isOk(x));// false
 * ```
 * @category Type
 * @param anyValue - the value to tested
 */
export function isOk<V, E>(anyValue: Result<V, E>): anyValue is Result.Ok<V> {
  return anyValue.ok;
}
