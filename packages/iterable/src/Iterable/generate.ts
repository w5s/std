import type { Int } from '@w5s/core';
import { empty } from './empty.js';

/**
 * Generate an iterable of `length` using `mapFn(index)` on each element
 *
 * @example
 * ```typescript
 * Iterable.generate(3, () => 'a');// == Iterable.of('a', 'a', 'a')
 * Iterable.generate(3, (index) => index * 2);// == Iterable.of(0, 2, 4)
 * ```
 * @category Constructor
 * @param length - The number of elements
 * @param mapFn - The mapping function
 */
export function generate<Value>(length: number, mapFn: (index: Int) => Value): Iterable<Value> {
  return length === 0
    ? empty()
    : {
        *[Symbol.iterator]() {
          for (let index = 0; index < length; index += 1) {
            yield mapFn(index as Int);
          }
        },
      };
}
