import type { Int } from '@w5s/core';
import { reduce } from './reduce.js';

const sum = (accumulator: Int) => (accumulator + 1) as Int;

/**
 * Returns the size of iterable
 *
 * @example
 * ```ts
 * const iterable = AsyncIterable.of(1, 2, 3);
 * size(iterable); // 3
 * ```
 * @param source
 */
export function size<Value>(source: AsyncIterable<Value>): Promise<Int> {
  return reduce(source, sum, 0 as Int);
}
