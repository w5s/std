/* cSpell:disable */
import { wrap } from './wrap.js';

/**
 * ANSI Color
 */
export type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

const colorMap = new Map(
  (
    [
      ['black', 30],
      ['red', 31],
      ['green', 32],
      ['yellow', 33],
      ['blue', 34],
      ['magenta', 35],
      ['cyan', 36],
      ['white', 37],
    ] as const
  ).map(([colorStr, code]) => [colorStr, wrap([code], 39, 'm')]),
);

/**
 * Return the ANSI escape sequence for the given color.
 *
 * @example
 * color('red')('foo') // '\x1b[31mfoo\x1b[39m'
 *
 * @param value - one of: black, red, green, yellow, blue, magenta, cyan, white
 * @returns the ANSI escape sequence for the given color
 */
export function color(value: Color) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return colorMap.get(value)!;
}
