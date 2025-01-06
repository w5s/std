/* cSpell:disable */
import { wrap } from './wrap.js';

/**
 * Font weight
 */
export type FontStyle = 'normal' | 'italic';

const fontStyleMap = new Map(
  (
    [
      ['normal', 23],
      ['italic', 3],
    ] as const
  ).map(([str, code]) => [str, wrap([code], 23, 'm')]),
);

/**
 * Retrieves the ANSI escape code for a given font style.
 *
 * @example
 * ```typescript
 * fontStyle('italic')('foo');// '\u001B[3mfoo\u001B[22m');
 * ```
 * @param value - The font style to retrieve the escape code for. Can be 'normal' or 'italic'.
 * @returns The ANSI escape code associated with the provided font weight.
 */
export function fontStyle(value: FontStyle) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return fontStyleMap.get(value)!;
}
