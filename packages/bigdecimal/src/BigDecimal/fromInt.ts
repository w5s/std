import type { Int } from '@w5s/num';
import { of } from './of.js';
import type { BigDecimal } from './BigDecimal.js';

/**
 * Converts an integer to a big decimal.
 *
 * @example
 * ```typescript
 * BigDecimal.fromInt(Int(1)); // BigDecimal('1')
 * BigDecimal.fromInt(Int(-1)); // BigDecimal('-1')
 * ```
 * @category Constructor
 * @param intValue - the integer value to convert to a big decimal
 */
export function fromInt(intValue: Int): BigDecimal {
  return of(BigInt(intValue), 0);
}
