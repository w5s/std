import type { Int } from '@w5s/core';

/**
 * Return a new Iterable which applies `mapFn` and concatenate the result to the previous
 *
 * @example
 * ```typescript
 * const iterable = Iterable.of(1, 2, 3);
 * Iterable.flatMap(
 *   iterable,
 *   (currentValue, currentIndex) => Iterable.of(currentValue, currentValue * 2),
 * );// == Iterable.of(1, 2, 2, 4, 3, 6)
 * ```
 * @param source - the iterable source
 * @param mapFn - a function that returns a new value
 */
export function flatMap<ValueFrom, ValueTo>(
  source: Iterable<ValueFrom>,
  mapFn: (currentValue: ValueFrom, currentIndex: Int) => Iterable<ValueTo>,
): Iterable<ValueTo> {
  return {
    *[Symbol.iterator]() {
      let currentIndex = 0;
      for (const currentValue of source) {
        yield* mapFn(currentValue, currentIndex as Int);
        currentIndex += 1;
      }
    },
  };
}
