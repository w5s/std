/**
 * Concatenates multiple iterables into a single iterable
 *
 * @example
 * ```typescript
 * const iterable = Iterable.of(
 *   Iterable.of(1, 2),
 *   Iterable.of(3, 4),
 * );
 * Iterable.concat(iterable); // == Iterable.of(1, 2, 3, 4)
 * ```
 * @param iterables - An array of iterables to concatenate.
 */
export function concat<Value>(iterables: Iterable<Iterable<Value>>): Iterable<Value> {
  return {
    *[Symbol.iterator]() {
      for (const iterable of iterables) {
        yield* iterable;
      }
    },
  };
}
