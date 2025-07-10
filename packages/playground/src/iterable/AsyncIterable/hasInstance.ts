/**
 * Returns `true` if `anyValue` is a valid {@link AsyncIterable}
 *
 * @example
 * ```typescript
 * AsyncIterable.hasInstance({});// false
 * AsyncIterable.hasInstance([]);// true
 * AsyncIterable.hasInstance({ [Symbol.iterator]: () => ({ next: () => ({ done: true }) }) });// true
 * ```
 * @category Type
 * @param anyValue - the value to tested
 */
export function hasInstance(anyValue: unknown): anyValue is AsyncIterable<unknown> {
  return (
    anyValue !== null &&
    typeof anyValue === 'object' &&
    typeof (anyValue as unknown as Record<string | symbol, unknown>)[Symbol.asyncIterator] === 'function'
  );
}
