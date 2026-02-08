import { bigint as BigIntType } from '@w5s/core/dist/Type/bigint.js';
import { parse } from './BigInt/parse.js';
import { format } from './BigInt/format.js';
import { BigIntComparable } from './BigInt/BigIntComparable.js';
import { fromInt } from './BigInt/fromInt.js';
import { fromNumber } from './BigInt/fromNumber.js';
import { BigIntIndexable } from './BigInt/BigIntIndexable.js';
import { BigIntIntegral } from './BigInt/BigIntIntegral.js';

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
  ...BigIntType,
  ...BigIntIntegral,
  parse,
  format,
  fromInt,
  fromNumber,
};
