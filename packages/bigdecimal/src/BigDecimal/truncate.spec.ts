import { describe, expect, it } from 'vitest';
import { truncate } from './truncate.js';
import { BigDecimal } from './BigDecimal.js';

describe(truncate, () => {
  it.each([
    { args: [BigDecimal('123')], expected: BigDecimal('123') },
    { args: [BigDecimal('123'), 0], expected: BigDecimal('123') },
    { args: [BigDecimal('-12.3')], expected: BigDecimal('-12') },
    { args: [BigDecimal('12.3')], expected: BigDecimal('12') },
    { args: [BigDecimal('123'), -1], expected: BigDecimal('120') },
  ] as Array<{
    args: [BigDecimal, number];
    expected: BigDecimal;
  }>)('returns truncated value', ({ args, expected }) => {
    expect(truncate(...args)).toEqual(expected);
  });
});
