import type { Ordering } from '@w5s/core';

import { compare as bigIntCompare } from '@w5s/num/dist/BigInt/compare.js';

import type { BigDecimal } from './BigDecimal.js';

import { bigDecimalScaleValue } from '../internal/bigDecimalScaleValue.js';

export function compare(left: BigDecimal, right: BigDecimal): Ordering {
  if (left.scale > right.scale) {
    return bigIntCompare(left.value, bigDecimalScaleValue(right, left.scale));
  }

  return left.scale < right.scale ? bigIntCompare(bigDecimalScaleValue(left, right.scale), right.value) : bigIntCompare(left.value, right.value);
}
