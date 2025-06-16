import { number as NumberType } from '@w5s/core/dist/Type/number.js';
import { parse } from './Number/parse.js';
import { format } from './Number/format.js';
import { NumberBounded } from './Number/NumberBounded.js';
import { NumberComparable } from './Number/NumberComparable.js';
import { NumberNumeric } from './Number/NumberNumeric.js';
import { NumberSigned } from './Number/NumberSigned.js';
import { NumberNegate } from './Number/NumberNegate.js';
import { NumberZero } from './Number/NumberZero.js';

/**
 * A collection of functions to manipulate `number`
 *
 * @example
 * ```typescript
 * import { Number } from '@w5s/core';
 *
 * const total = [1, 1.5, 2].reduce(Number['+'], 0);// 4.5
 * Number['=='](total, 4.5);// true
 * ```
 * @namespace
 */
export const Number = {
  ...NumberType,
  ...NumberComparable,
  ...NumberNumeric,
  ...NumberSigned,
  ...NumberBounded,
  ...NumberNegate,
  ...NumberZero,
  parse,
  format,
};
