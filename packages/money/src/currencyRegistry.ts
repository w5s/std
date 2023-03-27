import type { Option, Record } from '@w5s/core';
import { property, type Application } from '@w5s/application';
import { application } from './application.js';
import type { Currency } from './currency.js';

export interface CurrencyRegistry {
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
  readonly add: (currency: Currency) => void;

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
  readonly getByCode: (currencyCode: Currency['code']) => Option<Currency>;
}

export function CurrencyRegistry(app: Application): CurrencyRegistry {
  const codeIndex = property<Record<string, Currency>>(app.state, 'currency', Object.freeze({}));

  function add(currency: Currency): void {
    codeIndex.current = {
      ...codeIndex.current,
      [currency.code]: currency,
    };
  }

  function getByCode(currencyCode: Currency['code']): Option<Currency> {
    return codeIndex.current[currencyCode];
  }
  return {
    add,
    getByCode,
  };
}

export namespace CurrencyRegistry {
  export const { add, getByCode } = CurrencyRegistry(application);
}
