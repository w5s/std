/**
 * Reduce an `initialValue` to the `reducer` function
 *
 * @example
 * ```typescript
 * const iterable = [1, 2, 3];
 * Iterable.reduce(iterable, (total, value) => total + value, 0);// 6
 * ```
 * @param source - the iterator reduced
 * @param reducer - the reducer function
 * @param initialValue - the initial value passed to the reducer
 */
export function reduce<Value, Return>(
  source: Iterable<Value>,
  reducer: (accumulator: Return, value: Value) => Return,
  initialValue: Return,
): Return {
  let currentValue = initialValue;
  for (const value of source) {
    currentValue = reducer(currentValue, value);
  }
  return currentValue;
}
