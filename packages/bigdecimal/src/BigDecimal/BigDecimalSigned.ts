import type { Numeric } from '@w5s/core';
import { BigIntSigned } from '@w5s/bigint/dist/BigInt/BigIntSigned.js';
import type { BigDecimal } from './BigDecimal.js';
import { of } from './of.js';

const { abs: bigIntAbs, sign: bigIntSign, isNegative: bigIntIsNegative, isPositive: bigIntIsPositive } = BigIntSigned;

export const BigDecimalSigned: Numeric.Signed<BigDecimal> = {
  abs: (self) => of(bigIntAbs(self.value), self.scale),
  sign: (self) => of(bigIntSign(self.value), 0),
  isNegative: (self) => bigIntIsNegative(self.value),
  isPositive: (self) => bigIntIsPositive(self.value),
};
