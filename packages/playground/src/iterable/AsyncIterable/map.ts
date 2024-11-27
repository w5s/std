import type { Int } from '@w5s/core';
import type { Awaitable } from '@w5s/core-type';

/**
 * Return a new Iterable which applies `mapFn` to each values
 *
 * @example
 * ```typescript
 * const iterable = AsyncIterable.of(1, 2, 3);
 * AsyncIterable.map(iterator, (value) => value * 2);// == Iterable.of(2, 4, 6)
 * ```
 * @param source - the iterable source
 * @param mapFn - a function that returns a new value
 */
export function map<ValueFrom, ValueTo>(
  source: AsyncIterable<ValueFrom>,
  mapFn: (value: ValueFrom, index: Int) => Awaitable<ValueTo>,
): AsyncIterable<ValueTo> {
  return {
    async *[Symbol.asyncIterator]() {
      let index = 0;
      for await (const item of source) {
        yield mapFn(item, index as Int);
        index += 1;
      }
    },
  };
}
