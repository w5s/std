import { describe, expect, it } from 'vitest';
import { asString } from './asString.js';
import { BigDecimal } from './BigDecimal.js';

describe(asString, () => {
  it.each([
    [BigDecimal('2'), '2'],
    [BigDecimal('-2'), '-2'],
    [BigDecimal('0.123'), '0.123'],
    [BigDecimal('-0.123'), '-0.123'],
    [BigDecimal('200'), '200'],
    [BigDecimal('2.00'), '2.00'],
  ])('returns string conversion', (bigDecimal, expected) => {
    expect(asString(bigDecimal), expected);
  });
});
