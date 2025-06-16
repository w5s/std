import type { Numeric } from '@w5s/core/dist/Numeric.js';

export const BigIntNegate: Numeric.Negate<bigint> = {
  negate: (self) => -self,
};
