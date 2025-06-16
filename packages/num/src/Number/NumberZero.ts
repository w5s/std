import type { Numeric } from '@w5s/core';

export const NumberZero: Numeric.Zero<number> = {
  zero: () => 0,
  isZero: (self) => self === 0,
};
