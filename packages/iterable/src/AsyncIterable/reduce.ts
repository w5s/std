import type { Int } from '@w5s/core';
import type { Awaitable } from '@w5s/core-type';
import type { AsyncIterableLike } from '../AsyncIterableLike.js';

/**
 * Reduce an `initialValue` to the `reducer` function
 *
 * @example
 * ```typescript
 * const iterable = AsyncIterable.of(1, 2, 3);
 * await AsyncIterable.reduce(
 *   iterable,
 *   (total, value) => total + value,
 *   0,
 * );// 6
 * ```
 * @param self - the iterator reduced
 * @param reducer - the reducer function
 * @param initialValue - the initial value passed to the reducer
 */
export async function reduce<Value, Return>(
  self: AsyncIterableLike<Value>,
  reducer: (accumulator: Return, currentValue: Value, currentIndex: Int) => Awaitable<Return>,
  initialValue: Return,
): Promise<Return> {
  let accumulator = initialValue;
  let currentIndex = 0;
  for await (const currentValue of self) {
    accumulator = await reducer(accumulator, currentValue, currentIndex as Int);
    currentIndex += 1;
  }
  return accumulator;
}
