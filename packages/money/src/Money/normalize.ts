import { normalize as bigDecimalNormalize } from '@w5s/bigdecimal/dist/BigDecimal/normalize.js';
import { Money } from './Money.js';
import { __mapAmount } from './__mapAmount.js';

/**
 * Normalizes a `BigDecimal` object to its simplest form.
 * This means that the decimal part is reduced to its lowest terms.
 *
 * @example
 * ```typescript
 * Money.normalize(USD('1.020'));// USD('1.02')
 * Money.normalize(USD('1.02'));// USD('1.02')
 * ```
 * @param self - the `BigDecimal` object
 */
export function normalize(self: Money): Money {
  return __mapAmount(self, bigDecimalNormalize);
}
