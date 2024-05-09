/**
 * Returns the index of the last occurrence of `searchString` in a string.
 *
 * @example
 * ```typescript
 * String.includes('abc', 'ab'); // true
 * String.includes('abc', 'absent'); // false
 * ```
 * @category Predicate
 * @param string - The string
 * @param searchString - The string to search
 */
export function includes(string: string, searchString: string): boolean {
  return string.includes(searchString);
}
