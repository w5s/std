import type { Numeric } from '../Numeric.js';

export const NumberNegate: Numeric.Negate<number> = {
  negate: (self) => -self,
};
