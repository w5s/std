import { MoneyComparable } from './Money/MoneyComparable.js';
import { MoneyNumeric } from './Money/MoneyNumeric.js';
import { Money as MoneyType } from './Money/Money.js';

export type Money = MoneyType;

/**
 * @namespace
 */
export const Money = Object.assign(MoneyType, {
  ...MoneyComparable,
  ...MoneyNumeric,
});
