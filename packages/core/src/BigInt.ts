import { bigint as BigIntType } from './Type/bigint.js';
import { parse } from './BigInt/parse.js';
import { format } from './BigInt/format.js';
import { BigIntComparable } from './BigInt/BigIntComparable.js';
import { BigIntNumeric } from './BigInt/BigIntNumeric.js';
import { BigIntSigned } from './BigInt/BigIntSigned.js';
import { fromInt } from './BigInt/fromInt.js';
import { fromNumber } from './BigInt/fromNumber.js';
import { BigIntIndexable } from './BigInt/BigIntIndexable.js';
import { BigIntNegate } from './BigInt/BigIntNegate.js';

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
  ...BigIntIndexable,
  ...BigIntNegate,
  ...BigIntNumeric,
  ...BigIntSigned,
  ...BigIntType,
  parse,
  format,
  fromInt,
  fromNumber,
};
