import type { Numeric } from '@w5s/core';
import { BigDecimal } from './BigDecimal.js';

export const BigDecimalNegate: Numeric.Negate<BigDecimal> = {
  negate: ({ value, scale }) => BigDecimal.create({ value: -value, scale }),
};
