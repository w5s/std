import { describe, expect, it } from 'vitest';
import { parse } from './parse.js';
import { BigDecimal } from './BigDecimal.js';

describe(parse, () => {
  it.each([
    ['2', BigDecimal(2n, 0)],
    ['-2', BigDecimal(-2n, 0)],
    ['0.123', BigDecimal(123n, 3)],
    ['200', BigDecimal(200n, 0)],
    ['20000000', BigDecimal(20_000_000n, 0)],
    ['-20000000', BigDecimal(-20_000_000n, 0)],
    ['2.00', BigDecimal(200n, 2)],
    ['0.0000200', BigDecimal(200n, 7)],
    ['A', undefined],
    ['1E5', undefined],
  ])('constructs from string', (expression, expected) => {
    expect(parse(expression)).toEqual(expected);
  });
});
