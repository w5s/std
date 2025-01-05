/**
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code
 *
 * @example
 * ```typescript
 * ANSICode.format([1, 2], 'm');// '\u001b[1;2m'
 * ```
 * @param args - a list of arguments
 * @param code - a code suffix
 */
export function format(args: number[], code: string): string {
  return `\u001B[${args.join(';')}${code}`;
}
