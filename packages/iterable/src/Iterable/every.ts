import type { Int } from '@w5s/core';

/**
 * Tests whether all elements in the iterable pass the test implemented by the provided function.
 *
 * @example
 * ```typescript
 * const iterable = Iterable.of(1, 2, 3);
 * Iterable.every(iterable, (currentValue) => currentValue >= 1); // true
 * Iterable.every(iterable, (currentValue) => currentValue >= 2); // false
 * Iterable.every(iterable, (currentValue) => currentValue < 0); // false
 * ```
 * @category Predicate
 * @param source
 * @param predicate
 */
export function every<Value>(
  source: Iterable<Value>,
  predicate: (currentValue: Value, currentIndex: Int) => boolean,
): boolean {
  let currentIndex = 0;
  for (const currentValue of source) {
    if (!predicate(currentValue, currentIndex as Int)) {
      return false;
    }
    currentIndex += 1;
  }
  return true;
}
