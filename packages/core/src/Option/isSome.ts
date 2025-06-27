import { isNone } from './isNone.js';
import type { OptionLike } from '../Option.js';

/**
 * Return `true` if `anyValue` is neither `null` nor `undefined`
 *
 * @example
 * ```typescript
 * Option.isSome(Option.None);// false
 * Option.isSome(undefined);// false
 * Option.isSome(null);// false
 *
 * Option.isSome(Option.Some('foo'));// true
 * Option.isSome('foo');// true
 * ```
 * @category Type
 * @param anyValue - the value to test
 */
export function isSome<Value>(anyValue: Value): anyValue is Exclude<Value, OptionLike<never>> {
  return !isNone(anyValue);
}
