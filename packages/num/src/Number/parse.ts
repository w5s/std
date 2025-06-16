import type { Option } from '@w5s/core';

/**
 * Parses a string argument and returns an number
 * If the `expression` is not valid, it returns `Option.None`
 *
 * @example
 * ```typescript
 * Number.parse('1');// Option.Some(1)
 * Number.parse('invalid');// Option.None
 * ```
 * @param expression - an number expression
 */
export function parse(expression: string): Option<number> {
  const intValue = Number.parseFloat(expression);

  return Number.isNaN(intValue) ? undefined : intValue;
}
