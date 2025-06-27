import type { OptionLike } from '../Option.js';

/**
 * Returns the `value` if `Some`, `getDefaultValue()` if `None`.
 *
 * @example
 * ```typescript
 * const x = Some('foo');
 * Option.getOrElse(x, () => 'bar');// 'foo'
 *
 * const x = None;
 * Option.getOrElse(x, () => 'bar');// 'bar'
 * ```
 * @category Accessor
 * @param self - an optional value
 * @param getDefaultValue - a default value
 */
export function getOrElse<Value, DefaultValue>(
  self: OptionLike<Value>,
  getDefaultValue: () => DefaultValue,
): Value | DefaultValue {
  return self == null ? getDefaultValue() : self;
}
