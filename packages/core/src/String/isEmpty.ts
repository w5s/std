/**
 * Return true if the size of the array is 0
 *
 * @example
 * ```typescript
 * String.isEmpty('');// true
 * String.isEmpty('abc');// false
 * ```
 * @category Predicate
 * @param string - The string
 */
export function isEmpty(string: string): boolean {
  return string.length === 0;
}
