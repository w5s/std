import type { Int } from '@w5s/core';

/**
 * Return a new Iterable which applies `mapFn` to each values
 *
 * @example
 * ```typescript
 * const iterable = [1, 2, 3];
 * Iterable.map(iterator, (value) => value * 2);// == Iterable.of(2, 4, 6)
 * ```
 * @param source - the iterable source
 * @param mapFn - a function that returns a new value
 * @yields the mapped value
 */
export function* map<ValueFrom, ValueTo>(
  source: Iterable<ValueFrom>,
  mapFn: (value: ValueFrom, index: Int) => ValueTo,
): Iterable<ValueTo> {
  let index = 0;
  for (const item of source) {
    yield mapFn(item, index as Int);
    index += 1;
  }
}
