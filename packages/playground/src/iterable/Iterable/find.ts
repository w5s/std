import type { Option } from '@w5s/core';

/**
 * Returns the first element for which the given function returns true, otherwise undefined.
 *
 * @example
 * ```ts
 * const iterable = Iterable.of(
 *   { name: 'amy', id: 1 },
 *   { name: 'bob', id: 2 }
 * );
 * find(iterable, (item) => item.name === 'bob') // { name: 'bob', id: 2 }
 * find(iterable, (item) => item.name === 'cat') // undefined
 * ```
 * @param source - The input collection.
 * @param predicate - A function to test whether an item in the collection should be returned.
 */
export function find<Value>(
  source: Iterable<Value>,
  predicate: (currentValue: Value, currentIndex: number) => boolean,
): Option<Value> {
  let currentIndex = 0;
  for (const currentValue of source) {
    if (predicate(currentValue, currentIndex)) {
      return currentValue;
    }
    currentIndex += 1;
  }
  return undefined;
}
