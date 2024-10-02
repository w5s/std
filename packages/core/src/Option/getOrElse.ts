import type { Nullable } from '@w5s/core-type';

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
 * @param option - an optional value
 * @param getDefaultValue - a default value
 */
export function getOrElse<Value, DefaultValue>(
  option: Nullable<Value>,
  getDefaultValue: () => DefaultValue,
): Value | DefaultValue {
  return option == null ? getDefaultValue() : option;
}
