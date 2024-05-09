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
 * @param string - The string
 */
export function size(string: string): Int {
  return string.length as Int;
}
