import type { Awaitable } from '@w5s/core-type';
import type { Option } from '@w5s/core';
import type { AsyncIterableLike } from '../AsyncIterableLike.js';

/**
 * Returns the first element for which the given function returns true, otherwise undefined.
 *
 * @example
 * ```typescript
 * const iterable = AsyncIterable.of(
 *   { name: 'amy', id: 1 },
 *   { name: 'bob', id: 2 }
 * );
 * await AsyncIterable.find(iterable, (item) => item.name === 'bob') // { name: 'bob', id: 2 }
 * await AsyncIterable.find(iterable, (item) => item.name === 'cat') // undefined
 * ```
 * @param source - The input collection.
 * @param predicate - A function to test whether an item in the collection should be returned.
 */
export async function find<Value>(
  source: AsyncIterableLike<Value>,
  predicate: (currentValue: Value, currentIndex: number) => Awaitable<boolean>,
): Promise<Option<Value>> {
  let currentIndex = 0;
  for await (const currentValue of source) {
    if (await predicate(currentValue, currentIndex)) {
      return currentValue;
    }
    currentIndex += 1;
  }
  return undefined;
}
