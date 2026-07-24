import { Callable } from '@w5s/core/dist/Callable.js';

import { BigDecimal as BigDecimalType } from './BigDecimal/BigDecimal.js';
import { BigDecimalAsString } from './BigDecimal/BigDecimalAsString.js';
import { BigDecimalComparable } from './BigDecimal/BigDecimalComparable.js';
import { BigDecimalNegate } from './BigDecimal/BigDecimalNegate.js';
import { BigDecimalNumeric } from './BigDecimal/BigDecimalNumeric.js';
import { BigDecimalSigned } from './BigDecimal/BigDecimalSigned.js';
import { BigDecimalZero } from './BigDecimal/BigDecimalZero.js';
import { format } from './BigDecimal/format.js';
import { fromBigInt } from './BigDecimal/fromBigInt.js';
import { fromInt } from './BigDecimal/fromInt.js';
import { normalize } from './BigDecimal/normalize.js';
import { of } from './BigDecimal/of.js';
import { parse } from './BigDecimal/parse.js';
import { scale } from './BigDecimal/scale.js';
import { truncate } from './BigDecimal/truncate.js';

export type BigDecimal = BigDecimalType;

/**
 * Valid BigDecimal string representation
 */
export type BigDecimalString = `${number}`;

/**
 * A collection of functions to manipulate `BigDecimal`
 *
 * @namespace
 */
export const BigDecimal = Callable({
  ...BigDecimalType,
  ...BigDecimalComparable,
  ...BigDecimalNegate,
  ...BigDecimalNumeric,
  ...BigDecimalSigned,
  ...BigDecimalZero,
  ...BigDecimalAsString,
  format,
  fromBigInt,
  fromInt,
  normalize,
  of,
  parse,
  scale,
  truncate,
});
