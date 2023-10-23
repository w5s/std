/**
 * Raise a compile error when accessing this function and throws a TypeError at runtime
 * This is useful for exhaustive switch check.
 *
 * @example
 * ```typescript
 * const print = (fruit: 'banana'|'kiwi') => {
 *   switch (fruit) {
 *     case 'banana': return '🍌 Banana';
 *     case 'kiwi': return '🥝 Kiwi';
 *     default: return assertNever(fruit); // <- This line will report an error if a case is missing
 *   }
 * }
 * ```
 * @param subject - the never value that should be reported
 */
export function assertNever<V extends never>(subject: V): V {
  return subject;
}
