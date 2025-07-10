import type { Int } from '@w5s/core';
import type { AsyncIterableLike } from '../AsyncIterableLike.js';

/**
 * Return a new Iterable which applies `mapFn` and concatenate the result to the previous
 *
 * @example
 * ```typescript
 * const iterable = AsyncIterable.of(1, 2, 3);
 * await AsyncIterable.flatMap(
 *   iterable,
 *   (currentValue, currentIndex) => AsyncIterable.of(currentValue, currentValue * 2),
 * );// == AsyncIterable.of(1, 2, 2, 4, 3, 6)
 * ```
 * @param self - the iterable source
 * @param mapFn - a function that returns a new value
 */
export function flatMap<ValueFrom, ValueTo>(
  self: AsyncIterableLike<ValueFrom>,
  mapFn: (currentValue: ValueFrom, currentIndex: Int) => AsyncIterableLike<ValueTo>,
): AsyncIterable<ValueTo> {
  return {
    async *[Symbol.asyncIterator]() {
      let currentIndex = 0;
      for await (const currentValue of self) {
        yield* mapFn(currentValue, currentIndex as Int);
        currentIndex += 1;
      }
    },
  };
}
