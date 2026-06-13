import { describe } from 'vitest';
import { describeAsString } from '@w5s/core/Testing';
import { BigDecimalAsString } from './BigDecimalAsString.js';
import { BigDecimal } from './BigDecimal.js';

describe('BigDecimalAsString', () => {
  describeAsString(BigDecimalAsString, () => [
    [BigDecimal('2'), '2'],
    [BigDecimal('-2'), '-2'],
    [BigDecimal('0.123'), '0.123'],
    [BigDecimal('-0.123'), '-0.123'],
    [BigDecimal('200'), '200'],
    [BigDecimal('2.00'), '2.00'],
  ]);
});
