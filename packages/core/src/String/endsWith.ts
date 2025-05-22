/**
 * Returns true if string ends with searchString
 *
 * @example
 * ```typescript
 * String.endsWith('abc', 'bc'); // true
 * String.endsWith('abc', 'ab'); // false
 * ```
 * @category Predicate
 * @param self - The string
 * @param searchString - The string to search
 */
export function endsWith(self: string, searchString: string): boolean {
  return self.endsWith(searchString);
}
