import { Callable } from '@w5s/core/dist/Callable.js';

import { Currency as CurrencyType } from './Currency/Currency.js';
import { CurrencyAsString } from './Currency/CurrencyAsString.js';
import { CurrencyComparable } from './Currency/CurrencyComparable.js';

export type Currency = CurrencyType;

/**
 * @namespace
 */
export const Currency = Callable({
  ...CurrencyType,
  ...CurrencyComparable,
  ...CurrencyAsString,
});
