import { Callable } from '@w5s/core/dist/Callable.js';
import { MoneyComparable } from './Money/MoneyComparable.js';
import { MoneyNumeric } from './Money/MoneyNumeric.js';
import { Money as MoneyType } from './Money/Money.js';
import { format } from './Money/format.js';

export type Money = MoneyType;

/**
 * @namespace
 */
export const Money = Callable({
  ...MoneyType,
  ...MoneyComparable,
  ...MoneyNumeric,
  format,
});
