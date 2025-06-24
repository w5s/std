import { compare as bigIntCompare } from '@w5s/num/dist/BigInt/compare.js';
import type { Ordering } from '@w5s/core';
import type { BigDecimal } from './BigDecimal.js';
import { __scaleValue } from './__scaleValue.js';

export function compare(left: BigDecimal, right: BigDecimal): Ordering {
  return left.scale > right.scale
    ? bigIntCompare(left.value, __scaleValue(right, left.scale))
    : left.scale < right.scale
      ? bigIntCompare(__scaleValue(left, right.scale), right.value)
      : bigIntCompare(left.value, right.value);
}
