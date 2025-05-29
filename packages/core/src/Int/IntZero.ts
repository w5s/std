import type { Int } from '../Int.js';
import type { Numeric } from '../Numeric.js';

export const IntZero: Numeric.Zero<Int> = {
  zero: () => 0 as Int,
  isZero: (self) => self === 0,
};
