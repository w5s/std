import { describe, it, expect } from 'vitest';
import { from } from './from.js';
import { IntBounded } from './IntBounded.js';

describe(from, () => {
  const { minValue, maxValue } = IntBounded;

  it('should return identity for 0', () => {
    expect(from(0)).toBe(0);
  });
  it('should return rounded for floats', () => {
    expect(from(1.1)).toBe(1);
  });
  it('should return rounded for negative floats', () => {
    expect(from(-1.1)).toBe(-1);
  });
  it('should return identity for min value', () => {
    expect(from(minValue)).toBe(minValue);
  });
  it('should return identity for max value', () => {
    expect(from(maxValue)).toBe(maxValue);
  });

  it('should return max value for max value + 1', () => {
    expect(from(maxValue + 1)).toBe(maxValue);
  });
  it('should return min value for min value - 1', () => {
    expect(from(minValue - 1)).toBe(minValue);
  });
});
