import { Callable } from '@w5s/core/dist/Callable.js';
import { format } from './BigDecimal/format.js';
import { parse } from './BigDecimal/parse.js';
import { BigDecimalComparable } from './BigDecimal/BigDecimalComparable.js';
import { of } from './BigDecimal/of.js';
import { scale } from './BigDecimal/scale.js';
import { normalize } from './BigDecimal/normalize.js';
import { BigDecimalNumeric } from './BigDecimal/BigDecimalNumeric.js';
import { BigDecimal as BigDecimalType } from './BigDecimal/BigDecimal.js';
import { BigDecimalSigned } from './BigDecimal/BigDecimalSigned.js';

/**
 * Valid BigDecimal string representation
 */
export type BigDecimalString = `${number}`;

export type BigDecimal = BigDecimalType;

/**
 * A collection of functions to manipulate `BigDecimal`
 *
 * @namespace
 */
export const BigDecimal = Callable({
  ...BigDecimalType,
  ...BigDecimalComparable,
  ...BigDecimalNumeric,
  ...BigDecimalSigned,
  normalize,
  of,
  scale,
  parse,
  format,
});
