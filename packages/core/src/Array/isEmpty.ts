/**
 * Return true if the size of the array is 0
 *
 * @example
 * ```typescript
 * Array.isEmpty([]);// true
 * Array.isEmpty(['a', 'b', 'c']);// false
 * ```
 * @category Predicate
 * @param self - The array object
 */
export function isEmpty(self: ArrayLike<unknown>): boolean {
  return self.length === 0;
}
