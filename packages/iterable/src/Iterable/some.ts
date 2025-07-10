import type { Int } from '@w5s/core';

/**
 * Tests whether any element in the iterable pass the test implemented by the provided function.
 *
 * @example
 * ```typescript
 * const iterable = Iterable.of(1, 2, 3);
 * Iterable.some(iterable, (currentValue) => currentValue >= 1); // true
 * Iterable.some(iterable, (currentValue) => currentValue >= 2); // true
 * Iterable.some(iterable, (currentValue) => currentValue < 0); // false
 * ```
 * @category Predicate
 * @param source
 * @param predicate
 */
export function some<Value>(
  source: Iterable<Value>,
  predicate: (currentValue: Value, currentIndex: Int) => boolean,
): boolean {
  let currentIndex = 0;
  for (const currentValue of source) {
    if (predicate(currentValue, currentIndex as Int)) {
      return true;
    }
    currentIndex += 1;
  }
  return false;
}
