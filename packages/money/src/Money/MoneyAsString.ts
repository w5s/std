import { BigDecimalAsString } from '@w5s/bigdecimal/dist/BigDecimal/BigDecimalAsString.js';
import type { AsString } from '@w5s/core';
import { CurrencyAsString } from '../Currency/CurrencyAsString.js';
import type { Money } from './Money.js';

const bigDecimalAsString = BigDecimalAsString.asString;
const currencyAsString = CurrencyAsString.asString;

export const MoneyAsString: AsString<Money> = {
  /**
   * Returns a formatted representation of money
   *
   * @example
   * ```typescript
   * Money.asString(EUR('1.10'));// '1.10EUR';
   * ```
   * @category Formatting
   * @param self
   */
  asString(self: Money): string {
    return `${bigDecimalAsString(self.amount)}${currencyAsString(self.currency)}`;
  },
};
