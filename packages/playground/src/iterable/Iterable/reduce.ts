import type { Int } from '@w5s/core';

/**
 * Reduce an `initialValue` to the `reducer` function
 *
 * @example
 * ```typescript
 * const iterable = [1, 2, 3];
 * Iterable.reduce(iterable, (total, currentValue, currentIndex) => total + value, 0);// 6
 * ```
 * @param source - the iterator reduced
 * @param reducer - the reducer function
 * @param initialValue - the initial value passed to the reducer
 */
export function reduce<Value, Return>(
  source: Iterable<Value>,
  reducer: (accumulator: Return, currentValue: Value, currentIndex: Int) => Return,
  initialValue: Return,
): Return {
  let accumulator = initialValue;
  let currentIndex = 0;
  for (const currentValue of source) {
    accumulator = reducer(accumulator, currentValue, currentIndex as Int);
    currentIndex += 1;
  }
  return accumulator;
}
