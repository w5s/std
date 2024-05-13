import { format } from './BigDecimal/format.js';
import { parse } from './BigDecimal/parse.js';
import { BigDecimalComparable } from './BigDecimal/BigDecimalComparable.js';
import { of } from './BigDecimal/of.js';
import { scale } from './BigDecimal/scale.js';
import { normalize } from './BigDecimal/normalize.js';
import { BigDecimalNumeric } from './BigDecimal/BigDecimalNumeric.js';
import { BigDecimal as BigDecimalType } from './BigDecimal/BigDecimal.js';

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
export const BigDecimal = Object.assign(BigDecimalType, {
  ...BigDecimalComparable,
  ...BigDecimalNumeric,
  normalize,
  of,
  scale,
  parse,
  format,
});
