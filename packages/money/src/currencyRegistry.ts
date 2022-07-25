import type { Option } from '@w5s/core/lib/option.js';
import type { Currency } from './currency.js';

export class CurrencyRegistry {
  #codeIndex: Map<Currency['code'], Currency> = new Map();

  /**
   * Add a `currency` to the registry
   *
   * @example
   * ```typescript
   * const currency = Currency({ ... })
   * currencyRegistry.add(currency);
   * ```
   * @param currency - The currency to register
   */
  add(currency: Currency): void {
    this.#codeIndex.set(currency.code, currency);
  }

  /**
   * Return the currency by its `code`
   *
   * @example
   * ```typescript
   * currencyRegistry.getByCode('EUR'); // Currency({ code: 'EUR', ... });
   * currencyRegistry.getByCode('NOT_EXIST'); // undefined
   * ```
   * @param currencyCode - The currency to register
   */
  getByCode(currencyCode: Currency['code']): Option<Currency> {
    return this.#codeIndex.get(currencyCode);
  }
}

/**
 * Registry containing all known currencies
 */
export const currencyRegistry = new CurrencyRegistry();
