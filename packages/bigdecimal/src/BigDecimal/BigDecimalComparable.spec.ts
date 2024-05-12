import { describe, expect, it } from 'vitest';
import { describeComparable } from '@w5s/core/dist/testing.js';
import { BigDecimalComparable } from './BigDecimalComparable.js';
import { BigDecimal } from '../Type/BigDecimal.js';

describeComparable({ describe, it, expect })(BigDecimalComparable, {
  ordered: () => [
    BigDecimal('-10.0'),
    BigDecimal('-0.11'),
    BigDecimal('-0.1'),
    BigDecimal('0'),
    BigDecimal('0.1'),
    BigDecimal('0.11'),
    BigDecimal('10.0'),
  ],
  equivalent: () => [
    [BigDecimal('0'), BigDecimal('0')],
    [BigDecimal('1.0'), BigDecimal('1')],
    [BigDecimal('0.1'), BigDecimal('0.1')],
    [BigDecimal('-0.1'), BigDecimal('-0.1')],
  ],
});
