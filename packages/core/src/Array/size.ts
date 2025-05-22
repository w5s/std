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
 * @param self - The array object
 */
export function size(self: ArrayLike<unknown>): Int {
  return self.length as Int;
}
