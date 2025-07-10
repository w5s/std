import type { Int } from '@w5s/core';
import type { Awaitable } from '@w5s/core-type';
import type { AsyncIterableLike } from '../AsyncIterableLike.js';

/**
 * Tests whether any element in the async iterable pass the test implemented by the provided function.
 *
 * @example
 * ```typescript
 * const iterable = AsyncIterable.of(1, 2, 3);
 * await AsyncIterable.some(iterable, (currentValue) => currentValue >= 1); // true
 * await AsyncIterable.some(iterable, (currentValue) => currentValue >= 2); // true
 * await AsyncIterable.some(iterable, (currentValue) => currentValue < 0); // false
 * ```
 * @category Predicate
 * @param self
 * @param predicate
 */
export async function some<Value>(
  self: AsyncIterableLike<Value>,
  predicate: (currentValue: Value, currentIndex: Int) => Awaitable<boolean>,
): Promise<boolean> {
  let currentIndex = 0;
  for await (const currentValue of self) {
    if (await predicate(currentValue, currentIndex as Int)) {
      return true;
    }
    currentIndex += 1;
  }
  return false;
}
