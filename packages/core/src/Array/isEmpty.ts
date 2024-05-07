/**
 * Return true if the size of the array is 0
 *
 * @example
 * ```typescript
 * Array.isEmpty([]);// true
 * Array.isEmpty(['a', 'b', 'c']);// false
 * ```
 * @category Predicate
 * @param array - The array object
 */
export function isEmpty(array: ArrayLike<unknown>): boolean {
  return array.length === 0;
}
