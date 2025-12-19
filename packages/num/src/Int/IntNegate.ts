import type { Numeric } from '@w5s/core';
import type { Int } from '../Int.js';

export const IntNegate: Numeric.Negate<Int> = {

  negate: (self) => -self as Int,
};
