import { property, type ApplicationState } from '@w5s/app';
import type { Option, Record, Ref } from '@w5s/core';
import { app } from './app.js';
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

export function CurrencyRegistry(application: Ref<ApplicationState>): CurrencyRegistry {
  const codeIndex = property<Record<string, Currency>>(application, 'currency', Object.freeze({}));

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
  export const { add, getByCode } = CurrencyRegistry(app);
}
