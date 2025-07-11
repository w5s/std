import type { Int } from '@w5s/core';
import { reduce } from './reduce.js';
import type { AsyncIterableLike } from '../AsyncIterableLike.js';

const sum = (accumulator: Int) => (accumulator + 1) as Int;

/**
 * Returns the size of iterable
 *
 * @example
 * ```typescript
 * const iterable = AsyncIterable.of(1, 2, 3);
 * await AsyncIterable.size(iterable); // 3
 * ```
 * @category Accessor
 * @param self
 */
export function size<Value>(self: AsyncIterableLike<Value>): Promise<Int> {
  return reduce(self, sum, 0 as Int);
}
