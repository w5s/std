import type { Radix36 } from './Radix36.js';

/**
 * Return string representation of number
 *
 * @example
 * ```typescript
 * Number.format(1.1);// '1.1'
 * ```
 * @param numberValue - a number
 * @param radix - an optional base (ex: 10, 16)
 */
export function format(numberValue: number, radix?: Radix36): string {
  return numberValue.toString(radix);
}
