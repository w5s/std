import type { AsyncIterableLike } from '../AsyncIterableLike.js';
import { from } from './from.js';

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
export function zip<L, R>(left: AsyncIterableLike<L>, right: AsyncIterableLike<R>): AsyncIterable<[L, R]> {
  const leftIterable = from(left);
  const rightIterable = from(right);
  return {
    [Symbol.asyncIterator]: () => {
      const leftIterator = leftIterable[Symbol.asyncIterator]();
      const rightIterator = rightIterable[Symbol.asyncIterator]();
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
