import { compare as bigIntCompare } from '@w5s/core/dist/BigInt/compare.js';
import type { BigDecimal } from './BigDecimal.js';
import { scaleValue } from './scaleValue.js';

export function compare(left: BigDecimal, right: BigDecimal): number {
  return left.scale > right.scale
    ? bigIntCompare(left.value, scaleValue(right, left.scale))
    : left.scale < right.scale
      ? bigIntCompare(scaleValue(left, right.scale), right.value)
      : bigIntCompare(left.value, right.value);
}
