import { asString as bigDecimalAsString } from '@w5s/bigdecimal/dist/BigDecimal/asString.js';
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
  return `${bigDecimalAsString(self.amount)}${currencyAsString(self.currency)}`;
}
