/**
 * Iterable constructor
 *
 * @example
 * ```typescript
 * const iterable = Iterable.create(() => ({
 *   next() { ... }
 * }))
 * ```
 * @category Constructor
 * @param iteratorFn - function that creates a new iterator
 */
export function create<Value>(iteratorFn: () => Iterator<Value>): Iterable<Value> {
  return {
    [Symbol.iterator]: iteratorFn,
  };
}
