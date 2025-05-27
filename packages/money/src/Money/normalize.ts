import { normalize as bigDecimalNormalize } from '@w5s/bigdecimal/dist/BigDecimal/normalize.js';
import { Money } from './Money.js';
import { of } from './of.js';

/**
 * Normalizes a `BigDecimal` object to its simplest form.
 * This means that the decimal part is reduced to its lowest terms.
 *
 * @example
 * ```typescript
 * normalize(USD('1.020'));// USD('1.02')
 * normalize(USD('1.02'));// USD('1.02')
 * ```
 * @param self - the `BigDecimal` object
 */
export function normalize(self: Money): Money {
  const { amount } = self;
  const amountNew = bigDecimalNormalize(amount);

  return amount === amountNew ? self : of(self.currency, amountNew);
}
