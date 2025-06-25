import { describe, expect, it } from 'vitest';
import { BigDecimal } from './BigDecimal.js';
import { fromBigInt } from './fromBigInt.js';

describe(fromBigInt, () => {
  it.each([
    [0n, BigDecimal('0')],
    [1n, BigDecimal('1')],
    [-1n, BigDecimal('-1')],
  ])('returns BigDecimal value', (value, expected) => {
    expect(fromBigInt(value)).toEqual(expected);
  });
});
