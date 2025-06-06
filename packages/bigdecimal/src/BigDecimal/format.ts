import { BigDecimalAsString } from './BigDecimalAsString.js';
import type { BigDecimal } from './BigDecimal.js';

/**
 * Returns a string representation of a BigDecimal
 *
 * @example
 * ```typescript
 * BigDecimal.format(BigDecimal('1.020')); // '1.020'
 * ```
 * @param self
 */
export function format(self: BigDecimal): string {
  return BigDecimalAsString.asString(self);
}
