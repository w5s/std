import { describeComparable } from '@w5s/core/dist/Testing.js';
import { BigDecimalComparable } from './BigDecimalComparable.js';
import { BigDecimal } from './BigDecimal.js';

describeComparable(BigDecimalComparable, {
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
