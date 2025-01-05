import { format } from './format.js';

const identity = (_: string): string => _;

/**
 * Wraps a given string with ANSI escape codes for styling.
 *
 * @param open - An array of numbers representing the opening ANSI codes.
 * @param close - A number representing the closing ANSI code.
 * @param code - A string representing the ANSI code suffix.
 * @returns A function that takes a string and returns it wrapped with the specified ANSI codes.
 */

export function wrap(open: number[], close: number, code: string) {
  if (open.length === 0) return identity;
  const openTag = format(open, code);
  const closeTag = format([close], code);
  const regexp = new RegExp(`\\x1b\\[${close}m`, 'g');

  return (text: string): string => `${openTag}${text.replace(regexp, openTag)}${closeTag}`;
}
