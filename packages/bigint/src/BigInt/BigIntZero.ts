import type { Numeric } from '@w5s/core/dist/Numeric.js';

export const BigIntZero: Numeric.Zero<bigint> = {
  zero: () => 0n,
  isZero: (self) => self === 0n,
};
