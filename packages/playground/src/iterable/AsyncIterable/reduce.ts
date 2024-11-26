/**
 * Reduce an `initialValue` to the `reducer` function
 *
 * @example
 * ```typescript
 * const iterable = AsyncIterable.of(1, 2, 3);
 * AsyncIterable.reduce(iterable, (total, value) => total + value, 0);// 6
 * ```
 * @param source - the iterator reduced
 * @param reducer - the reducer function
 * @param initialValue - the initial value passed to the reducer
 */
export async function reduce<Value, Return>(
  source: AsyncIterable<Value>,
  reducer: (accumulator: Return, value: Value) => Return,
  initialValue: Return,
): Promise<Return> {
  let currentValue = initialValue;
  for await (const value of source) {
    currentValue = reducer(currentValue, value);
  }
  return currentValue;
}
