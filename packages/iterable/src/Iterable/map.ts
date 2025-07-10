import type { Int } from '@w5s/core';

/**
 * Return a new Iterable which applies `mapFn` to each values
 *
 * @example
 * ```typescript
 * const iterable = [1, 2, 3];
 * Iterable.map(
 *   iterable,
 *   (currentValue, currentIndex) => currentValue * 2,
 * );// == Iterable.of(2, 4, 6)
 * ```
 * @param source - the iterable source
 * @param mapFn - a function that returns a new value
 */
export function map<ValueFrom, ValueTo>(
  source: Iterable<ValueFrom>,
  mapFn: (currentValue: ValueFrom, currentIndex: Int) => ValueTo,
): Iterable<ValueTo> {
  return {
    *[Symbol.iterator]() {
      let currentIndex = 0;
      for (const currentValue of source) {
        yield mapFn(currentValue, currentIndex as Int);
        currentIndex += 1;
      }
    },
  };
}
