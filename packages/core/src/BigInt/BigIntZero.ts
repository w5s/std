import type { Numeric } from '../Numeric.js';

export const BigIntZero: Numeric.Zero<bigint> = {
  zero: () => 0n,
  isZero: (self) => self === 0n,
};
