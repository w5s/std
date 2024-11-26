/**
 * Create an iterable of given `values`
 *
 * @example
 * ```typescript
 * Iterable.of('a', 'b', 'c');// 'a', 'b', 'c'
 * ```
 * @category Constructor
 * @param values - The values of the iterable
 */
export function of<Value>(...values: Value[]): Iterable<Value> {
  return {
    [Symbol.iterator]: values[Symbol.iterator].bind(values),
  };
}
