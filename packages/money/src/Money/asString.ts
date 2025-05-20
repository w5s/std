import { format as bigDecimalFormat } from '@w5s/bigdecimal/dist/BigDecimal/format.js';
import { asString as currencyAsString } from '../Currency/asString.js';
import type { Money } from './Money.js';

/**
 * Returns a formatted representation of money
 *
 * @example
 * ```typescript
 * Money.asString(EUR('1.10'));// '1.10EUR';
 * ```
 * @param self
 */
export function asString(self: Money): string {
  return `${bigDecimalFormat(self.amount)}${currencyAsString(self.currency)}`;
}
