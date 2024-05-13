import { Comparable } from '@w5s/core';
import type { BigDecimal } from './BigDecimal.js';
import { compare } from './compare.js';

export const BigDecimalComparable: Comparable<BigDecimal> = Comparable({
  compare,
});
