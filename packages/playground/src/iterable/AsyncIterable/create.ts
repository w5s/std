/**
 * Iterable constructor
 *
 * @example
 * ```typescript
 * const iterable = AsyncIterable.create(() => ({
 *   next() { ... }
 * }))
 * ```
 * @category Constructor
 * @param iteratorFn - function that creates a new iterator
 */
export function create<Value>(iteratorFn: () => AsyncIterator<Value>): AsyncIterable<Value> {
  return {
    [Symbol.asyncIterator]: iteratorFn,
  };
}
