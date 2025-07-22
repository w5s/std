/**
 *
 * @example
 * ```typescript
 * Iterable.from([1, 2, 3]);// Iterable.of(1, 2, 3)
 * Iterable.from(function* () { yield 1; yield 2; yield 3; })// Iterable.of(1, 2, 3)
 * ```
 * @category Constructor
 * @param source
 */
export function from<Value>(source: Iterable<Value> | (() => Iterator<Value>)): Iterable<Value> {
  const getIterator = typeof source === 'function' ? source : () => source[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return getIterator();
    },
  };
}
