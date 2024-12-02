import type { Int } from '@w5s/core';
import type { Awaitable } from '@w5s/core-type';

/**
 * Tests whether any element in the async iterable pass the test implemented by the provided function.
 *
 * @example
 * ```ts
 * const iterable = AsyncIterable.of(1, 2, 3);
 * await AsyncIterable.some(iterable, (currentValue) => currentValue >= 1); // true
 * await AsyncIterable.some(iterable, (currentValue) => currentValue >= 2); // true
 * await AsyncIterable.some(iterable, (currentValue) => currentValue < 0); // false
 * ```
 * @param source
 * @param predicate
 */
export async function some<Value>(
  source: AsyncIterable<Value>,
  predicate: (currentValue: Value, currentIndex: Int) => Awaitable<boolean>,
): Promise<boolean> {
  let currentIndex = 0;
  for await (const currentValue of source) {
    if (await predicate(currentValue, currentIndex as Int)) {
      return true;
    }
    currentIndex += 1;
  }
  return false;
}