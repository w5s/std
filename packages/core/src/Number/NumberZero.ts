import type { Numeric } from '../Numeric.js';

export const NumberZero: Numeric.Zero<number> = {
  zero: () => 0,
  isZero: (self) => self === 0,
};
