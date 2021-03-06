import { describe, test, expect } from '@jest/globals';
import { Math } from './math.js';

describe('Math', () => {
  const anyNumericValue = [-0.6, -0.5, -0.4, 0, 0.4, 0.5, 0.6];

  describe(Math.floor, () => {
    test.each(anyNumericValue)('should be an alias to Math.floor', (value) => {
      expect(Math.floor(value)).toBe(globalThis.Math.floor(value));
    });
  });
  describe(Math.ceil, () => {
    test.each(anyNumericValue)('should be an alias to Math.ceil', (value) => {
      expect(Math.ceil(value)).toBe(globalThis.Math.ceil(value));
    });
  });
  describe(Math.round, () => {
    test.each(anyNumericValue)('should be an alias to Math.round', (value) => {
      expect(Math.round(value)).toBe(globalThis.Math.round(value));
    });
  });
  describe(Math.abs, () => {
    test.each(anyNumericValue)('should be an alias to Math.abs', (value) => {
      expect(Math.abs(value)).toBe(globalThis.Math.abs(value));
    });
  });
  describe(Math.truncate, () => {
    test.each(anyNumericValue)('should be an alias to Math.trunc', (value) => {
      expect(Math.truncate(value)).toBe(globalThis.Math.trunc(value));
    });
  });
});
