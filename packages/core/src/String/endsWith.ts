/**
 * Returns true if string ends with searchString
 *
 * @example
 * ```typescript
 * String.endsWith('abc', 'bc'); // true
 * String.endsWith('abc', 'ab'); // false
 * ```
 * @category Predicate
 * @param string - The string
 * @param searchString - The string to search
 */
export function endsWith(string: string, searchString: string) {
  return string.endsWith(searchString);
}
