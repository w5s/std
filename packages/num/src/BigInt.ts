import { bigint as BigIntType } from '@w5s/core/dist/Type/bigint.js';

import { BigIntComparable } from './BigInt/BigIntComparable.js';
import { BigIntIndexable } from './BigInt/BigIntIndexable.js';
import { BigIntIntegral } from './BigInt/BigIntIntegral.js';
import { format } from './BigInt/format.js';
import { fromInt } from './BigInt/fromInt.js';
import { fromNumber } from './BigInt/fromNumber.js';
import { parse } from './BigInt/parse.js';

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
  format,
  fromInt,
  fromNumber,
  parse,
};
