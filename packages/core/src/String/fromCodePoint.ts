/**
 * Returns a string created by using the specified code point.
 *
 * @example
 * ```typescript
 * String.fromCodePoint(65, 9731) == "A☃"
 * ```
 * @category Constructor
 * @param code - an array of string codes
 */
export function fromCodePoint(...code: number[]): string {
  return globalThis.String.fromCodePoint(...code);
}
