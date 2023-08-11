/**
 * Return a function that will always return `value`
 *
 * @example
 * ```typescript
 * const constFoo = constant('foo');
 * constFoo();// 'foo'
 * ```
 * @param value - the input and return value
 */
export function constant<T>(value: T): (anyValue?: unknown) => T {
  return () => value;
}
