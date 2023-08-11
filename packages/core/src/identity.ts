/**
 * Return the unchanged given `value`
 *
 * @example
 * ```typescript
 * identity('foo');// 'foo'
 * ```
 * @param value - the input and return value
 */
export function identity<T>(value: T): T {
  return value;
}
