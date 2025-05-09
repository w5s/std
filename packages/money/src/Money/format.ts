import { format as bigDecimalFormat } from '@w5s/bigdecimal/dist/BigDecimal/format.js';
import type { Money } from './Money.js';

/**
 * Returns a formatted representation of money
 *
 * @example
 * ```typescript
 * Money.format(EUR('1.10'));// '1.10EUR';
 * ```
 * @param self
 */
export function format(self: Money): string {
  return `${bigDecimalFormat(self.amount)}${self.currency.code}`;
}
