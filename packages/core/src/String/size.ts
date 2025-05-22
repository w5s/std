import type { Int } from '../Int.js';

/**
 * Return the length of the string
 *
 * @example
 * ```typescript
 * String.size('') // 0
 * String.size('foo bar') // 6
 * ```
 * @category Accessor
 * @param self - The string
 */
export function size(self: string): Int {
  return self.length as Int;
}
