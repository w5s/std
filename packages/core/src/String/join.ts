/**
 * Joins the given array of strings.
 *
 * @example
 * ```typescript
 * String.join('|', ['a', 'b', 'c']) // 'a|b|c'
 * ```
 * @category Combinator
 * @param separator - the separator
 * @param parts - a tested value
 */
export function join(separator: string, parts: Array<string>): string {
  return parts.join(separator);
}
