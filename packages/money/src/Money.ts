import { Callable } from '@w5s/core/dist/Callable.js';

import { format } from './Money/format.js';
import { Money as MoneyType } from './Money/Money.js';
import { MoneyAsString } from './Money/MoneyAsString.js';
import { MoneyComparable } from './Money/MoneyComparable.js';
import { MoneyNegate } from './Money/MoneyNegate.js';
import { MoneyNumeric } from './Money/MoneyNumeric.js';
import { MoneySigned } from './Money/MoneySigned.js';
import { MoneyZero } from './Money/MoneyZero.js';
import { normalize } from './Money/normalize.js';
import { parse } from './Money/parse.js';

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
