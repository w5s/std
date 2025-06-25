import type { BigDecimal } from './BigDecimal.js';
import { of } from './of.js';

/**
 * Converts a bigint to a big decimal.
 *
 * @example
 * ```typescript
 * BigDecimal.fromBigInt(1n); // BigDecimal('1')
 * BigDecimal.fromBigInt(-1n); // BigDecimal('-1')
 * ```
 * @category Constructor
 * @param bigIntValue - the bigint value to convert to a big decimal
 */
export function fromBigInt(bigIntValue: bigint): BigDecimal {
  return of(bigIntValue, 0);
}
