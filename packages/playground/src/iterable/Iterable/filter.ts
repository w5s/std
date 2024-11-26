import type { Int } from '@w5s/core';

/**
 * Return a new iterator that filters values using `predicate`
 *
 * @example
 * ```typescript
 * const iterator = [1, 2, 3];
 * Iterable.filter(iterator, (value) => value > 1);// == Iterable.of(2, 3)
 * ```
 * @param source - the iterator to be filtered
 * @param predicate - a function that returns a boolean
 * @yields The filtered value that satisfies predicate
 */
export function* filter<Value>(
  source: Iterable<Value>,
  predicate: (value: Value, index: Int) => boolean,
): Iterable<Value> {
  let index = 0;
  for (const item of source) {
    if (predicate(item, index as Int)) {
      yield item;
      index += 1;
    }
  }
}
