import type { Char } from '../Char.js';

/**
 * Returns a Char created by using the specified code point.
 *
 * @example
 * ```typescript
 * Char.fromCodePoint(65, 9731) == "A☃"
 * ```
 * @category Constructor
 * @param code - an array of string codes
 */
export function fromCodePoint(...code: number[]): Char {
  return globalThis.String.fromCodePoint(...code) as Char;
}
