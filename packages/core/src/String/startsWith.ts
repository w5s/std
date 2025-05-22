/**
 * Returns true if string starts with searchString
 *
 * @example
 * ```typescript
 * String.startsWith('abc', 'ab'); // true
 * String.startsWith('abc', 'bc'); // false
 * ```
 * @category Predicate
 * @param self - The string
 * @param searchString - The string to search
 */
export function startsWith(self: string, searchString: string): boolean {
  return self.startsWith(searchString);
}
