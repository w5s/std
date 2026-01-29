import { number as NumberType } from '@w5s/core/dist/Type/number.js';
import { parse } from './Number/parse.js';
import { format } from './Number/format.js';
import { NumberConversion } from './NumberConversion.js';

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
  ...NumberConversion(),
  parse,
  format,
};
