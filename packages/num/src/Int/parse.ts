import type { Option } from '@w5s/core/dist/Option.js';
import type { Radix36 } from '@w5s/core-type';
import type { Int } from '../Int.js';
import { fromNumber } from './fromNumber.js';

/**
 * Parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems).
 * If the `expression` is not valid, it returns `Option.None`
 *
 * @example
 * ```typescript
 * Int.parse('1');// Option.Some(1)
 * Int.parse('invalid');// Option.None
 * ```
 * @param expression - an integer expression
 * @param radix - an optional base (ex: 10, 16)
 */
export function parse(expression: string, radix?: Radix36): Option<Int> {
  /* eslint-disable unicorn/prefer-number-properties */
  const intValue = parseInt(expression, radix);

  return Number.isNaN(intValue) ? undefined : fromNumber(intValue);
}
