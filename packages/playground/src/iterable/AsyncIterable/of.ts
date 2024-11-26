/**
 * Create an iterable of given `values`
 *
 * @example
 * ```typescript
 * AsyncIterable.of('a', 'b', 'c');// 'a', 'b', 'c'
 * ```
 * @category Constructor
 * @param values - The values of the iterable
 */
export function of<Value>(...values: Value[]): AsyncIterable<Value> {
  return {
    async *[Symbol.asyncIterator]() {
      for (const value of values) {
        yield value;
      }
    },
  };
}
