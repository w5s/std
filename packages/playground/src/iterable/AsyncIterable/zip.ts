/**
 * Combine two iterables into an iterable of couple of their values.
 * The result has the size of the smallest iterable used.
 *
 * @example
 * ```typescript
 * const left = AsyncIterable.of(1, 2, 3);
 * const right = AsyncIterable.of('a', 'b');
 * AsyncIterable.zip(left, right);// == AsyncIterable.of([1, 'a'], [2, 'b'])
 * ```
 * @param left - Left iterable
 * @param right - Right iterable
 */
export function zip<L, R>(left: AsyncIterable<L>, right: AsyncIterable<R>): AsyncIterable<[L, R]> {
  return {
    [Symbol.asyncIterator]: () => {
      const leftIterator = left[Symbol.asyncIterator]();
      const rightIterator = right[Symbol.asyncIterator]();
      return {
        async next() {
          const [leftResult, rightResult] = await Promise.all([leftIterator.next(), rightIterator.next()]);

          return leftResult.done === true || rightResult.done === true
            ? { done: true, value: undefined }
            : { done: false, value: [leftResult.value, rightResult.value] as [L, R] };
        },
      };
    },
  };
}
