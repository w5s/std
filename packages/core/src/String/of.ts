/**
 * Return a new string from all parts passed as arguments
 *
 * @example
 * ```typescript
 * String.of('a', 'b', 'c') // 'abc'
 * ```
 * @category Constructor
 * @param args - a list of parts
 */
export function of(...args: Array<string>): string {
  return args.join('');
}
