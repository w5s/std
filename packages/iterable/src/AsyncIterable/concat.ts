/**
 * Concatenates multiple iterables into a single iterable
 *
 * @example
 * ```typescript
 * const iterable = AsyncIterable.of(
 *   AsyncIterable.of(1, 2),
 *   AsyncIterable.of(3, 4),
 * );
 * AsyncIterable.concat(iterable); // == AsyncIterable.of(1, 2, 3, 4)
 * ```
 * @param iterables - An array of iterables to concatenate.
 */
export function concat<Value>(iterables: AsyncIterable<AsyncIterable<Value>>): AsyncIterable<Value> {
  return {
    async *[Symbol.asyncIterator]() {
      for await (const iterable of iterables) {
        yield* iterable;
      }
    },
  };
}
