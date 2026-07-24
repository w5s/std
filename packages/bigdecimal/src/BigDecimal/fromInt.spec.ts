import { Int } from '@w5s/num';
import { describe, expect, it } from 'vitest';

import { BigDecimal } from './BigDecimal.js';
import { fromInt } from './fromInt.js';

describe(fromInt, () => {
  it.each([
    [Int(0), BigDecimal('0')],
    [Int(1), BigDecimal('1')],
    [Int(-1), BigDecimal('-1')],
  ])('returns BigDecimal value', (value, expected) => {
    expect(fromInt(value)).toEqual(expected);
  });
});
