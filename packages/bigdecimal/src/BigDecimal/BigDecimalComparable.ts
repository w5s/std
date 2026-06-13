import { Comparable } from '@w5s/core/Comparable';
import type { BigDecimal } from './BigDecimal.js';
import { compare } from './compare.js';

export const BigDecimalComparable: Comparable<BigDecimal> = Comparable({
  compare,
});
