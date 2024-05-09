import { describe, it, expect } from 'vitest';
import { NumberBounded } from './NumberBounded.js';

describe('NumberBounded', () => {
  describe('.minValue', () => {
    it('should be Number.MIN_VALUE', () => {
      expect(NumberBounded.minValue).toBe(globalThis.Number.MIN_VALUE);
    });
  });
  describe('.maxValue', () => {
    it('should be Number.MAX_VALUE', () => {
      expect(NumberBounded.maxValue).toBe(globalThis.Number.MAX_VALUE);
    });
  });
});
