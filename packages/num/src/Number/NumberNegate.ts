import type { Numeric } from '@w5s/core';

export const NumberNegate: Numeric.Negate<number> = {
  negate: (self) => -self,
};
