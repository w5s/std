import { describe, expect, it } from 'vitest';

import { BigDecimal } from './BigDecimal.js';
import { format } from './format.js';

describe(format, () => {
  it.each([
    [BigDecimal('2'), '2'],
    [BigDecimal('-2'), '-2'],
    [BigDecimal('0.123'), '0.123'],
    [BigDecimal('-0.123'), '-0.123'],
    [BigDecimal('200'), '200'],
    [BigDecimal('2.00'), '2.00'],
  ])('returns string conversion', (bigDecimal, expected) => {
    expect(format(bigDecimal)).toBe(expected);
  });
});
