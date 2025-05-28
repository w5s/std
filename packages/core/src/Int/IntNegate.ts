import type { Int } from '../Int.js';
import type { Numeric } from '../Numeric.js';

export const IntNegate: Numeric.Negate<Int> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-unary-minus
  negate: (self) => -self as Int,
};
