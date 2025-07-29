import type { BigDecimal } from './BigDecimal.js';
import { of } from './of.js';

/**
 * Truncates the `BigDecimal` to a specified number of decimal places.
 *
 * @example
 * ```typescript
 * BigDecimal.truncate(BigDecimal('123'), -1);// == BigDecimal('123'))
 * BigDecimal.truncate(BigDecimal('-12.3'))// == BigDecimal('-12'))
 * BigDecimal.truncate(BigDecimal('12.3'))// == BigDecimal('12'))
 * ```
 * @category Numeric
 */
export function truncate(self: BigDecimal, scale = 0): BigDecimal {
  return self.scale <= scale ? self : of(self.value / 10n ** BigInt(self.scale - scale), scale);
}
