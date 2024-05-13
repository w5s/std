import { describe, expect, it } from 'vitest';
import { format } from './format.js';
import { BigDecimal } from './BigDecimal.js';

describe(format, () => {
  it.each([
    [BigDecimal('2'), '2'],
    [BigDecimal('-2'), '-2'],
    [BigDecimal('0.123'), '0.123'],
    [BigDecimal('-0.123'), '-0.123'],
    [BigDecimal('200'), '200'],
    [BigDecimal('2.00'), '2.00'],
  ])('returns string conversion', (bigDecimal, expected) => {
    expect(format(bigDecimal), expected);
  });
});
