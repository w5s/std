import { CurrencyComparable } from './Currency/CurrencyComparable.js';
import { defaultRounding } from './Currency/defaultRounding.js';
import { defaultPrecision } from './Currency/defaultPrecision.js';
import { Currency as CurrencyType } from './Currency/Currency.js';

export type Currency = CurrencyType;
/**
 * @namespace
 */
export const Currency = Object.assign(CurrencyType, {
  defaultRounding,
  defaultPrecision,
  ...CurrencyComparable,
});
