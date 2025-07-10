import type { Int } from '@w5s/core';
import type { Awaitable } from '@w5s/core-type';
import type { AsyncIterableLike } from '../AsyncIterableLike.js';

/**
 * Tests whether all elements in the async iterable pass the test implemented by the provided function.
 *
 * @example
 * ```typescript
 * const iterable = AsyncIterable.of(1, 2, 3);
 * await AsyncIterable.every(iterable, (currentValue) => currentValue >= 1); // true
 * await AsyncIterable.every(iterable, (currentValue) => currentValue >= 2); // false
 * await AsyncIterable.every(iterable, (currentValue) => currentValue < 0); // false
 * ```
 * @category Predicate
 * @param source
 * @param predicate
 */
export async function every<Value>(
  source: AsyncIterableLike<Value>,
  predicate: (currentValue: Value, currentIndex: Int) => Awaitable<boolean>,
): Promise<boolean> {
  let currentIndex = 0;
  for await (const currentValue of source) {
    if (!(await predicate(currentValue, currentIndex as Int))) {
      return false;
    }
    currentIndex += 1;
  }
  return true;
}
