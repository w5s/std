import type { OptionLike } from '../Option.js';

/**
 * Return `true` if `anyValue` is `null`or `undefined`
 *
 * @example
 * ```typescript
 * Option.isNone(None);// true
 * Option.isNone(undefined);// true
 * Option.isNone(null);// true
 *
 * Option.isNone(Some('foo'));// false
 * Option.isNone('foo');// false
 * ```
 * @category Type
 * @param anyValue - the value to test
 */
export function isNone(anyValue: unknown): anyValue is OptionLike<never> {
  return anyValue == null;
}
