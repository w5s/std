/* cSpell:disable */
import { wrap } from './wrap.js';

/**
 * Font weight
 */
export type FontWeight = 'normal' | 'bold' | 'dim';

const fontWeightMap = new Map(
  (
    [
      ['normal', 22],
      ['bold', 1],
      ['dim', 2],
    ] as const
  ).map(([str, code]) => [str, wrap([code], 22, 'm')]),
);

/**
 * Retrieves the ANSI escape code for a given font weight.
 *
 * @example
 * ```typescript
 * fontWeight('bold')('foo') // '\x1b[1mfoo\x1b[22m'
 * ```
 * @param value - The font weight to retrieve the escape code for. Can be 'bold' or 'dim'.
 * @returns The ANSI escape code associated with the provided font weight.
 */
export function fontWeight(value: FontWeight) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return fontWeightMap.get(value)!;
}
