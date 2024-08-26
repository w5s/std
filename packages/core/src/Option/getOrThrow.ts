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
 * @param option - an optional value
 */
export function getOrThrow<Value>(option: Nullable<Value>): Value {
  if (option != null) {
    return option;
  }
  throw new TypeError('option must not be a null|undefined');
}
