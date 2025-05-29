import type { Numeric } from '@w5s/core';
import { lazy } from '@w5s/core/dist/lazy.js';
import { BigDecimal } from './BigDecimal.js';

export const BigDecimalZero: Numeric.Zero<BigDecimal> = {
  zero: lazy(() => BigDecimal('0')),
  isZero: (self) => self.value === 0n,
};
