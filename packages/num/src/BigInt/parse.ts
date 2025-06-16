import type { Option } from '@w5s/core/dist/Option.js';

/**
 * Parse the expression and returns a bigint
 *
 * @example
 * ```typescript
 * BigInt.parse('0b10101');// Option.Some(21n)
 * BigInt.parse('1024');// Option.Some(1024n)
 * BigInt.parse('0x123');// Option.Some(291n)
 * BigInt.parse('0x123');// Option.Some(291n)
 * BigInt.parse('invalid');// Option.None
 * ```
 * @param expression - the expression to parse
 */
export function parse(expression: string): Option<bigint> {
  if (expression !== '' && !/^\s+$/.test(expression)) {
    try {
      return globalThis.BigInt(expression);
    } catch {
      /* empty */
    }
  }
  return undefined;
}
