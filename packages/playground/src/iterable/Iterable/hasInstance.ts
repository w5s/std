/**
 * Returns `true` if `anyValue` is a valid {@link Iterable}
 *
 * @example
 * ```typescript
 * Iterable.hasInstance({});// false
 * Iterable.hasInstance([]);// true
 * Iterable.hasInstance({ [Symbol.iterator]: () => ({ next: () => ({ done: true }) }) });// true
 * ```
 * @category Type
 * @param anyValue - the value to tested
 */
export function hasInstance(anyValue: unknown): anyValue is Iterable<unknown> {
  return (
    anyValue !== null &&
    typeof anyValue === 'object' &&
    typeof (anyValue as unknown as Record<string | symbol, unknown>)[Symbol.iterator] === 'function'
  );
}
