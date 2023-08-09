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
