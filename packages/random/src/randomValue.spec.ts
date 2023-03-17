import { describe, expect, it } from 'vitest';
import { RandomValue } from './randomValue.js';

describe('RandomValue', () => {
  it('should return new random value', () => {
    expect(RandomValue(0)).toBe(0);
    expect(RandomValue(1)).toBe(1);
  });
  it.each([Number.NaN, -1, 2])('should throw invariant when invalid value : %s', (invalidValue) => {
    expect(() => RandomValue(invalidValue)).toThrow(`Random value should be between 0 and 1. Got ${invalidValue}`);
  });

  describe('.hasInstance', () => {
    it('should return new random value', () => {
      expect(RandomValue.hasInstance(0)).toBe(true);
      expect(RandomValue.hasInstance(1)).toBe(true);
    });
    it.each([Number.NaN, -1, 2])('should return false for invalid value : %s', (invalidValue) => {
      expect(RandomValue.hasInstance(invalidValue)).toBe(false);
    });
  });
});
