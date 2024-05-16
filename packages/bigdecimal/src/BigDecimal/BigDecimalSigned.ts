import type { Numeric } from '@w5s/core';
import { BigIntSigned } from '@w5s/core/dist/BigInt/BigIntSigned.js';
import type { BigDecimal } from './BigDecimal.js';
import { of } from './of.js';

// eslint-disable-next-line @typescript-eslint/unbound-method
const { abs: bigIntAbs, sign: bigIntSign } = BigIntSigned;

export const BigDecimalSigned: Numeric.Signed<BigDecimal> = {
  abs: (value) => of(bigIntAbs(value.value), value.scale),
  sign: (value) => of(bigIntSign(value.value), 0),
};
