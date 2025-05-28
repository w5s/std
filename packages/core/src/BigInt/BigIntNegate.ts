import type { Numeric } from '../Numeric.js';

export const BigIntNegate: Numeric.Negate<bigint> = {
  negate: (self) => -self,
};
