import type { Int } from '@w5s/core';
import type { Awaitable } from '@w5s/core-type';

/**
 * Return a new iterator that filters values using `predicate`
 *
 * @example
 * ```typescript
 * const iterable = AsyncIterable.of(1, 2, 3);
 * AsyncIterable.filter(iterable, (value) => value > 1);// == AsyncIterable.of(2, 3)
 * ```
 * @param source - the iterable to be filtered
 * @param predicate - a function that returns a boolean
 */
export function filter<Value>(
  source: AsyncIterable<Value>,
  predicate: (value: Value, index: Int) => Awaitable<boolean>,
): AsyncIterable<Value> {
  return {
    async *[Symbol.asyncIterator]() {
      let index = 0;
      for await (const item of source) {
        if (await predicate(item, index as Int)) {
          yield item;
          index += 1;
        }
      }
    },
  };
}
