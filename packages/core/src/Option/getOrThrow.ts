import type { Nullable } from '@w5s/core-type';

/**
 * Returns the value if `Some`, throw an error if `None`
 *
 * **⚠ Impure function that may throw an error, its use is generally discouraged.**
 *
 * @example
 * ```typescript
 * let x = Some('foo');
 * Option.getOrThrow(x);// 'foo'
 *
 * let x = None;
 * Option.getOrThrow(x);// throw TypeError('option must not be a null|undefined')
 * ```
 * @category Accessor
 * @param self - an optional value
 */
export function getOrThrow<Value>(self: Nullable<Value>): Value {
  if (self != null) {
    return self;
  }
  throw new TypeError('option must not be a null|undefined');
}
