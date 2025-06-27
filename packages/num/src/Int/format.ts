import type { Radix36 } from '@w5s/core-type';
import type { Int } from '../Int.js';

/**
 * Return string representation of integer
 *
 * @example
 * ```typescript
 * Int.format(Int(1), 10);// '1'
 * Int.format(Int(10), 16);// 'A'
 * ```
 * @param intValue - an integer
 * @param radix - an optional base (ex: 10, 16)
 */
export function format(intValue: Int, radix?: Radix36): string {
  return intValue.toString(radix);
}
