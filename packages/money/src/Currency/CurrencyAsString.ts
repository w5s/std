import type { AsString } from '@w5s/core/AsString';
import type { Currency } from './Currency.js';

export const CurrencyAsString: AsString<Currency> = {
  /**
   * Returns a formatted representation of currency
   *
   * @example
   * ```typescript
   * Currency.asString(EUR('1.10'));// 'EUR';
   * ```
   * @category Formatting
   * @param self the currency object to format
   */
  asString(self: Currency): string {
    return self.code;
  },
};
