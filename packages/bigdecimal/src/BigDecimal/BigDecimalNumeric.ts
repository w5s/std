import type { Numeric } from '@w5s/core';
import { BigIntNumeric } from '@w5s/core/dist/BigInt/BigIntNumeric.js';
import type { BigDecimal } from './BigDecimal.js';
import { of } from './of.js';
import { scaleValue } from './scaleValue.js';

// eslint-disable-next-line @typescript-eslint/unbound-method
const { abs: bigIntAbs, sign: bigIntSign } = BigIntNumeric;

function combine2(combineFn: (left: bigint, right: bigint) => bigint) {
  return (left: BigDecimal, right: BigDecimal) =>
    left.scale > right.scale
      ? of(combineFn(left.value, scaleValue(right, left.scale)), left.scale)
      : left.scale < right.scale
        ? of(combineFn(scaleValue(left, right.scale), right.value), right.scale)
        : of(combineFn(left.value, right.value), left.scale);
}

export const BigDecimalNumeric: Numeric<BigDecimal> = {
  '+': combine2((l, r) => l + r),
  '-': combine2((l, r) => l - r),
  '*': (l, r) => of(l.value * r.value, l.scale + r.scale),
  abs: (value) => of(bigIntAbs(value.value), value.scale),
  sign: (value) => of(bigIntSign(value.value), 0),
};
