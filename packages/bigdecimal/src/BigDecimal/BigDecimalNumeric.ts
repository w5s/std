import type { Numeric } from '@w5s/core';
import type { BigDecimal } from './BigDecimal.js';
import { of } from './of.js';
import { bigDecimalScaleValue } from '../internal/bigDecimalScaleValue.js';

function combine2(combineFn: (left: bigint, right: bigint) => bigint) {
  return (left: BigDecimal, right: BigDecimal) =>
    left.scale > right.scale
      ? of(combineFn(left.value, bigDecimalScaleValue(right, left.scale)), left.scale)
      : left.scale < right.scale
        ? of(combineFn(bigDecimalScaleValue(left, right.scale), right.value), right.scale)
        : of(combineFn(left.value, right.value), left.scale);
}

interface BigDecimalNumeric
  extends
  Numeric.Add<BigDecimal>,
  Numeric.Subtract<BigDecimal>,
  Numeric.Multiply<BigDecimal>,
  Numeric.CheckedRemainder<BigDecimal> {}

export const BigDecimalNumeric: BigDecimalNumeric = {
  '+': combine2((l, r) => l + r),
  '-': combine2((l, r) => l - r),
  '*': (l, r) => of(l.value * r.value, l.scale + r.scale),
  '%?': (self, divisor) => {
    if (divisor.value === 0n) {
      return undefined;
    }
    const max = Math.max(self.scale, divisor.scale);
    return of(bigDecimalScaleValue(self, max) % bigDecimalScaleValue(divisor, max), max);
  },
};
