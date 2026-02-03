/* cSpell: ignore mfoo */
import { format } from './format.js';

const identity = Object.assign((_: string): string => _, { open: undefined, close: undefined });

export interface ANSIWrapper {
  /**
   * Wraps a given string with ANSI escape codes for styling.
   */
  (text: string): string;
  /**
   * Open tag
   */
  open: string | undefined;
  /**
   * Close tag
   */
  close: string | undefined;
}

/**
 * Wraps a given string with ANSI escape codes for styling.
 *
 * @example
 * ```typescript
 * ANSICode.wrap([1, 4, 42], 0, 'm')('foo'); // '\u001B[1;4;42mfoo\u001B[0m'
 * ```
 * @param open - An array of numbers representing the opening ANSI codes.
 * @param close - A number representing the closing ANSI code.
 * @param code - A string representing the ANSI code suffix.
 * @returns A function that takes a string and returns it wrapped with the specified ANSI codes.
 */
export function wrap(open: number[], close: number, code: string): ANSIWrapper {
  if (open.length === 0) return identity;
  const openTag = format(open, code);
  const closeTag = format([close], code);
  const regexp = new RegExp(`\\x1b\\[${close}m`, 'g');

  return Object.assign((text: string): string => `${openTag}${text.replace(regexp, openTag)}${closeTag}`, {
    open: openTag,
    close: closeTag,
  });
}
