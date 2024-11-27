import type { Int } from '@w5s/core';
import type { Awaitable } from '@w5s/core-type';
import { empty } from './empty.js';

/**
 * Generate an iterable of `length` using `mapFn(index)` on each element
 *
 * @example
 * ```typescript
 * AsyncIterable.generate(3, () => 'a');// == AsyncIterable.of('a', 'a', 'a')
 * AsyncIterable.generate(3, (index) => index * 2);// == AsyncIterable.of(0, 2, 4)
 * ```
 * @category Constructor
 * @param length - The number of elements
 * @param mapFn - The mapping function
 */
export function generate<Value>(length: number, mapFn: (index: Int) => Awaitable<Value>): AsyncIterable<Value> {
  return length === 0
    ? empty()
    : {
        async *[Symbol.asyncIterator]() {
          for (let index = 0; index < length; index += 1) {
            yield mapFn(index as Int);
          }
        },
      };
}
