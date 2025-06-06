import { Callable } from '@w5s/core/dist/Callable.js';
import { MoneyComparable } from './Money/MoneyComparable.js';
import { MoneyNumeric } from './Money/MoneyNumeric.js';
import { Money as MoneyType } from './Money/Money.js';
import { MoneyAsString } from './Money/MoneyAsString.js';
import { format } from './Money/format.js';
import { normalize } from './Money/normalize.js';
import { parse } from './Money/parse.js';
import { MoneyNegate } from './Money/MoneyNegate.js';
import { MoneyZero } from './Money/MoneyZero.js';
import { MoneySigned } from './Money/MoneySigned.js';

export type Money = MoneyType;

/**
 * @namespace
 */
export const Money = Callable({
  ...MoneyType,
  ...MoneyComparable,
  ...MoneyNegate,
  ...MoneyNumeric,
  ...MoneySigned,
  ...MoneyZero,
  ...MoneyAsString,
  format,
  normalize,
  parse,
});
