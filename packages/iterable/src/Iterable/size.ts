import type { Int } from '@w5s/core';
import { reduce } from './reduce.js';

const sum = (accumulator: Int) => (accumulator + 1) as Int;

/**
 * Returns the size of iterable
 *
 * @example
 * ```typescript
 * const iterable = Iterable.of(1, 2, 3);
 * size(iterable); // 3
 * ```
 * @category Accessor
 * @param self
 */
export function size<Value>(self: Iterable<Value>): Int {
  return reduce(self, sum, 0 as Int);
}
