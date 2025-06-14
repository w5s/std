import type { Numeric } from '@w5s/core/dist/Numeric.js';

export const BigIntSigned: Numeric.Signed<bigint> = {
  abs: (value) => (value < 0n ? -value : value),
  sign: (value) => (value < 0n ? -1n : value > 0n ? 1n : 0n),
  isNegative: (self) => self < 0n,
  isPositive: (self) => self > 0n,
};
