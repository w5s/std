import { describe, expect, it } from 'vitest';
import { NumberConversion } from './NumberConversion.js';
import { Bounded } from './NumberConversion/Bounded.js';
import { Comparable } from './NumberConversion/Comparable.js';
import { Multiply } from './NumberConversion/Multiply.js';
import { Negate } from './NumberConversion/Negate.js';
import { Numeric } from './NumberConversion/Numeric.js';
import { Power } from './NumberConversion/Power.js';
import { Remainder } from './NumberConversion/Remainder.js';
import { Signed } from './NumberConversion/Signed.js';
import { Subtract } from './NumberConversion/Subtract.js';
import { Zero } from './NumberConversion/Zero.js';

describe('NumberConversion', () => {
  it('should reexport sub namespaces', () => {
    expect(NumberConversion).toEqual(
      expect.objectContaining({
        Bounded,
        Comparable,
        Multiply,
        Negate,
        Numeric,
        Power,
        Remainder,
        Signed,
        Subtract,
        Zero,
      }),
    );
  });
  it('should create a default number conversion module', () => {
    expect(NumberConversion()).toEqual(
      expect.objectContaining({
        '+': expect.any(Function),
        '*': expect.any(Function),
        negate: expect.any(Function),
        zero: expect.any(Function),
        minValue: expect.any(Number),
        maxValue: expect.any(Number),
        compare: expect.any(Function),
      }),
    );
  });
});
