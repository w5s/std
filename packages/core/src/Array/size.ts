import type { Int } from '../Int.js';

/**
 * Return the length of the array
 *
 * @example
 * ```typescript
 * Array.size([]) // 0
 * Array.size(['foo', 'bar']) // 2
 * ```
 * @category Accessor
 * @param array - The array object
 */
export function size(array: ArrayLike<unknown>): Int {
  return array.length as Int;
}
