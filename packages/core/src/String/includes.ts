/**
 * Returns the index of the last occurrence of `searchString` in a string.
 *
 * @example
 * ```typescript
 * String.includes('abc', 'ab'); // true
 * String.includes('abc', 'absent'); // false
 * ```
 * @category Predicate
 * @param self - The string
 * @param searchString - The string to search
 */
export function includes(self: string, searchString: string): boolean {
  return self.includes(searchString);
}
