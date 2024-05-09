/**
 * Joins the given array of strings.
 *
 * @example
 * ```typescript
 * String.concat(['a', 'b', 'c']) // 'abc'
 * ```
 * @category Combinator
 * @param parts - a tested value
 */
export function concat(parts: Array<string>): string {
  return parts.join('');
}
