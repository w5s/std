import type { Numeric } from '@w5s/core';
import type { Int } from '../Int.js';

export const IntZero: Numeric.Zero<Int> = {
  zero: () => 0 as Int,
  isZero: (self) => self === 0,
};
