import type { Int } from '@w5s/core';

/**
 * Return a new iterable that filters values using `predicate`
 *
 * @example
 * ```typescript
 * const iterable = [1, 2, 3];
 * Iterable.filter(
 *   iterable,
 *   (currentValue, currentIndex) => currentValue > 1,
 * );// == Iterable.of(2, 3)
 * ```
 * @param self - the iterator to be filtered
 * @param predicate - a function that returns a boolean
 */
export function filter<Value>(
  self: Iterable<Value>,
  predicate: (currentValue: Value, currentIndex: Int) => boolean,
): Iterable<Value> {
  return {
    *[Symbol.iterator]() {
      let currentIndex = 0;
      for (const currentValue of self) {
        if (predicate(currentValue, currentIndex as Int)) {
          yield currentValue;
        }
        currentIndex += 1;
      }
    },
  };
}
