import { Callable } from '@w5s/core/Callable';
import { CurrencyComparable } from './Currency/CurrencyComparable.js';
import { Currency as CurrencyType } from './Currency/Currency.js';
import { CurrencyAsString } from './Currency/CurrencyAsString.js';

export type Currency = CurrencyType;

/**
 * @namespace
 */
export const Currency = Callable({
  ...CurrencyType,
  ...CurrencyComparable,
  ...CurrencyAsString,
});
