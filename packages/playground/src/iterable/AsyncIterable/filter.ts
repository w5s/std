import type { Int } from '@w5s/core';
import type { Awaitable } from '@w5s/core-type';
import type { AsyncIterableLike } from '../AsyncIterableLike.js';

/**
 * Return a new iterator that filters values using `predicate`
 *
 * @example
 * ```typescript
 * const iterable = AsyncIterable.of(1, 2, 3);
 * AsyncIterable.filter(
 *   iterable,
 *   (currentValue, currentIndex) => currentValue > 1,
 * );// == AsyncIterable.of(2, 3)
 * ```
 * @param source - the iterable to be filtered
 * @param predicate - a function that returns a boolean
 */
export function filter<Value>(
  source: AsyncIterableLike<Value>,
  predicate: (currentValue: Value, currentIndex: Int) => Awaitable<boolean>,
): AsyncIterable<Value> {
  return {
    async *[Symbol.asyncIterator]() {
      let currentIndex = 0;
      for await (const currentValue of source) {
        if (await predicate(currentValue, currentIndex as Int)) {
          yield currentValue;
        }
        currentIndex += 1;
      }
    },
  };
}
