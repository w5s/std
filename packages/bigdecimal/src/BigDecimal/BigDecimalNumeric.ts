import type { Numeric } from '@w5s/core';
import type { BigDecimal } from './BigDecimal.js';
import { of } from './of.js';
import { scaleValue } from './scaleValue.js';

function combine2(combineFn: (left: bigint, right: bigint) => bigint) {
  return (left: BigDecimal, right: BigDecimal) =>
    left.scale > right.scale
      ? of(combineFn(left.value, scaleValue(right, left.scale)), left.scale)
      : left.scale < right.scale
        ? of(combineFn(scaleValue(left, right.scale), right.value), right.scale)
        : of(combineFn(left.value, right.value), left.scale);
}

interface BigDecimalNumeric
  extends Numeric.Add<BigDecimal>,
    Numeric.Subtract<BigDecimal>,
    Numeric.Multiply<BigDecimal> {}

export const BigDecimalNumeric: BigDecimalNumeric = {
  '+': combine2((l, r) => l + r),
  '-': combine2((l, r) => l - r),
  '*': (l, r) => of(l.value * r.value, l.scale + r.scale),
};
