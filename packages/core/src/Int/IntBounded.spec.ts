import { describe, it, expect } from 'vitest';
import { IntBounded } from './IntBounded.js';

describe('IntBounded', () => {
  const minValue = Number.MIN_SAFE_INTEGER;
  const maxValue = Number.MAX_SAFE_INTEGER;

  describe('.minValue', () => {
    it(`should be ${minValue}`, () => {
      expect(IntBounded.minValue).toBe(minValue);
    });
  });
  describe('.maxValue', () => {
    it(`should be ${maxValue}`, () => {
      expect(IntBounded.maxValue).toBe(maxValue);
    });
  });
});
