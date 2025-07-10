/**
 * Combine two iterables into an iterable of couple of their values.
 * The result has the size of the smallest iterable used.
 *
 * @example
 * ```typescript
 * const left = [1, 2, 3];
 * const right = ['a', 'b'];
 * Iterable.zip(left, right);// == Iterable.of([1, 'a'], [2, 'b'])
 * ```
 * @param left - Left iterable
 * @param right - Right iterable
 */
export function zip<L, R>(left: Iterable<L>, right: Iterable<R>): Iterable<[L, R]> {
  return {
    [Symbol.iterator]: () => {
      const leftIterator = left[Symbol.iterator]();
      const rightIterator = right[Symbol.iterator]();
      return {
        next() {
          const leftResult = leftIterator.next();
          const rightResult = rightIterator.next();

          return leftResult.done === true || rightResult.done === true
            ? { done: true, value: undefined }
            : { done: false, value: [leftResult.value, rightResult.value] as [L, R] };
        },
      };
    },
  };
}
