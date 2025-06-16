import type { Numeric } from '@w5s/core';
import type { Int } from '../Int.js';

export const IntNegate: Numeric.Negate<Int> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-unary-minus
  negate: (self) => -self as Int,
};
