import type { Option } from '@w5s/core';
import { useState } from '@w5s/application';
import type { Currency } from './Currency/Currency.js';
import { meta } from './meta.js';

export interface CurrencyRegistry {
  /**
   * Add a `currency` to the registry
   *
   * @example
   * ```typescript
   * const currency = Currency({ ... })
   * currencyRegistry.add(currency);
   * ```
   * @param currency The currency to register
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
   * @param currencyCode The currency to register
   */
  readonly getByCode: (currencyCode: Currency['code']) => Option<Currency>;
}

export function CurrencyRegistry(name: string | {
  name: string;
}): CurrencyRegistry {
  const codeIndex = useState<Readonly<Record<string, Currency>>>(name, 'currency', Object.freeze({}));

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
const { add, getByCode } = CurrencyRegistry(meta);
CurrencyRegistry.add = add;
CurrencyRegistry.getByCode = getByCode;
