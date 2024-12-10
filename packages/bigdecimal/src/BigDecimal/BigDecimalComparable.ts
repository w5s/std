import { Comparable } from '@w5s/core/dist/Comparable.js';
import type { BigDecimal } from './BigDecimal.js';
import { compare } from './compare.js';

export const BigDecimalComparable: Comparable<BigDecimal> = Comparable({
  compare,
});
