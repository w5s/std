/**
 * Return `true` if `anyValue` is a {@link PromiseLike}
 *
 * @example
 * ```typescript
 * isPromiseLike(Promise.resolve());// true
 * isPromiseLike(null);// false
 * ```
 * @category Type
 * @param anyValue
 */
export function isPromiseLike<V>(anyValue: unknown): anyValue is PromiseLike<V> {
  return (
    typeof anyValue === 'object' && anyValue !== null && typeof (anyValue as { then?: unknown }).then === 'function'
  );
}
