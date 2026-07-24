import type { Numeric } from '@w5s/core';

import { BigIntIntegral } from '@w5s/num/dist/BigInt/BigIntIntegral.js';

import type { BigDecimal } from './BigDecimal.js';

import { of } from './of.js';

const { abs: bigIntAbs, isNegative: bigIntIsNegative, isPositive: bigIntIsPositive, sign: bigIntSign } = BigIntIntegral;

export const BigDecimalSigned: Numeric.Signed<BigDecimal> = {
  abs: (self) => of(bigIntAbs(self.value), self.scale),
  isNegative: (self) => bigIntIsNegative(self.value),
  isPositive: (self) => bigIntIsPositive(self.value),
  sign: (self) => of(bigIntSign(self.value), 0),
};
