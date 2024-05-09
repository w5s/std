import { BigInt as BigIntType } from './Type/BigInt.js';
import { parse } from './BigInt/parse.js';
import { format } from './BigInt/format.js';
import { BigIntComparable } from './BigInt/BigIntComparable.js';
import { BigIntNumeric } from './BigInt/BigIntNumeric.js';

/**
 * A collection of functions to manipulate `bigint`
 *
 * @example
 * ```typescript
 * import { BigInt } from '@w5s/core';
 *
 * const total = [1n, 2n, 3n].reduce(BigInt['+'], 0n);// 6n
 * BigInt['=='](total, 6n);// true
 * ```
 * @namespace
 */
export const BigInt = {
  ...BigIntComparable,
  ...BigIntNumeric,
  ...BigIntType,
  parse,
  format,
};
