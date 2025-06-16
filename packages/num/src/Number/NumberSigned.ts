import type { Numeric } from '@w5s/core';

export const NumberSigned: Numeric.Signed<number> = {
  abs: Math.abs,
  sign: Math.sign,
  isNegative: (self) => self < 0,
  isPositive: (self) => self > 0,
};
