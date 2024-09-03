import { Callable } from '@w5s/core/dist/Callable.js';
import { CurrencyComparable } from './Currency/CurrencyComparable.js';
import { Currency as CurrencyType } from './Currency/Currency.js';

export type Currency = CurrencyType;
/**
 * @namespace
 */
export const Currency = Callable({
  ...CurrencyType,
  ...CurrencyComparable,
});
