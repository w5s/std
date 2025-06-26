import type { Int } from '@w5s/core';
import type { Array } from '../Array.js';
import { empty } from './empty.js';

/**
 * Generate an array of `length` using `mapFn(index)` on each element
 *
 * @example
 * ```typescript
 * Array.generate(3, () => 'a');// == ['a', 'a', 'a']
 * Array.generate(3, (index) => index * 2);// == [0, 2, 4]
 * ```
 * @category Constructor
 * @param length - The number of elements
 * @param mapFn - The mapping function
 */
export function generate<Value>(length: number, mapFn: (index: Int) => Value): Array<Value> {
  return length === 0 ? empty() : globalThis.Array.from({ length }, (_, index) => mapFn(index as Int));
}
