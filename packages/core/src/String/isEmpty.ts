/**
 * Return true if the size of the array is 0
 *
 * @example
 * ```typescript
 * String.isEmpty('');// true
 * String.isEmpty('abc');// false
 * ```
 * @category Predicate
 * @param self - The string
 */
export function isEmpty(self: string): boolean {
  return self.length === 0;
}
