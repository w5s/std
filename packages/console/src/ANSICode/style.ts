import { color, type Color } from './color.js';
import { fontStyle, type FontStyle } from './fontStyle.js';
import { fontWeight, type FontWeight } from './fontWeight.js';

export interface Style {
  /**
   * The color to apply to the string.
   */
  color: Color;
  /**
   * The font weight to apply to the string.
   */
  fontWeight: FontWeight;
  /**
   * The font style to apply to the string.
   */
  fontStyle: FontStyle;
}

const andThen =
  (format: (_: string) => string, thenFn: (_: string) => string) =>
  // Return new formatter function
  (str: string) =>
    thenFn(format(str));

/**
 * Apply ANSI styles to a string.
 *
 * @example
 * ```typescript
 * ANSICode.style({ color: 'red', fontWeight: 'bold' })('foo');
 * ```
 * @param value - The style definition.
 * @returns A function that takes a string and applies the styles.
 */
export function style(value: Partial<Style>) {
  let format = (_: string) => _;
  if (value.color != null) {
    format = andThen(format, color(value.color));
  }
  if (value.fontStyle != null) {
    format = andThen(format, fontStyle(value.fontStyle));
  }
  if (value.fontWeight != null) {
    format = andThen(format, fontWeight(value.fontWeight));
  }
  return (str: string): string => format(str);
}
