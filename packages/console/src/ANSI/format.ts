/**
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code
 *
 * @example
 * ```typescript
 * format([1, 2], 'm');// '\u001b[1;2m'
 * ```
 * @param args
 * @param code
 */
export function format(args: number[], code: string): string {
  return `\u001B[${args.join(';')}${code}`;
}
