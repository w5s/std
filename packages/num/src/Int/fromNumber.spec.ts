import { Option } from '@w5s/core';
import { describe, expect, it } from 'vitest';

import { fromNumber } from './fromNumber.js';

describe(fromNumber, () => {
  const { MAX_SAFE_INTEGER: maxValue, MIN_SAFE_INTEGER: minValue } = Number;

  it('should return identity for 0', () => {
    expect(fromNumber(0)).toBe(0);
  });
  it('should return rounded for floats', () => {
    expect(fromNumber(1.1)).toBe(1);
  });
  it('should return rounded for negative floats', () => {
    expect(fromNumber(-1.1)).toBe(-1);
  });
  it('should return identity for min value', () => {
    expect(fromNumber(minValue)).toBe(minValue);
  });
  it('should return identity for max value', () => {
    expect(fromNumber(maxValue)).toBe(maxValue);
  });

  it('should return max value for max value + 1', () => {
    expect(fromNumber(maxValue + 1)).toBe(Option.None);
  });
  it('should return min value for min value - 1', () => {
    expect(fromNumber(minValue - 1)).toBe(Option.None);
  });
  it('should return none for NaN', () => {
    expect(fromNumber(NaN)).toBe(Option.None);
  });
});
