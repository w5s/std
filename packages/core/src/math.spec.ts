import { describe, it, expect } from '@jest/globals';
import { Math } from './math.js';

describe('Math', () => {
  const anyNumericValue = [-0.6, -0.5, -0.4, 0, 0.4, 0.5, 0.6];

  describe('.floor', () => {
    it.each(anyNumericValue)('should be an alias to Math.floor', (value) => {
      expect(Math.floor(value)).toBe(globalThis.Math.floor(value));
    });
  });
  describe('.ceil', () => {
    it.each(anyNumericValue)('should be an alias to Math.ceil', (value) => {
      expect(Math.ceil(value)).toBe(globalThis.Math.ceil(value));
    });
  });
  describe('.round', () => {
    it.each(anyNumericValue)('should be an alias to Math.round', (value) => {
      expect(Math.round(value)).toBe(globalThis.Math.round(value));
    });
  });
  describe('.abs', () => {
    it.each(anyNumericValue)('should be an alias to Math.abs', (value) => {
      expect(Math.abs(value)).toBe(globalThis.Math.abs(value));
    });
  });
  describe('.min', () => {
    it.each(anyNumericValue)('should be an alias to Math.min', (left) => {
      anyNumericValue.forEach((right) => {
        expect(Math.min(left, right)).toBe(globalThis.Math.min(left, right));
      });
    });
  });
  describe('.max', () => {
    it.each(anyNumericValue)('should be an alias to Math.max', (left) => {
      anyNumericValue.forEach((right) => {
        expect(Math.max(left, right)).toBe(globalThis.Math.max(left, right));
      });
    });
  });
  describe('.truncate', () => {
    it.each(anyNumericValue)('should be an alias to Math.trunc', (value) => {
      expect(Math.truncate(value)).toBe(globalThis.Math.trunc(value));
    });
  });
  describe('.sqrt', () => {
    it.each(anyNumericValue)('should be an alias to Math.sqrt', (value) => {
      expect(Math.sqrt(value)).toBe(globalThis.Math.sqrt(value));
    });
  });
});
