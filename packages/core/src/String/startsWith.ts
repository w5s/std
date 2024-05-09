/**
 * Returns true if string starts with searchString
 *
 * @example
 * ```typescript
 * String.startsWith('abc', 'ab'); // true
 * String.startsWith('abc', 'bc'); // false
 * ```
 * @category Predicate
 * @param string - The string
 * @param searchString - The string to search
 */
export function startsWith(string: string, searchString: string) {
  return string.startsWith(searchString);
}
