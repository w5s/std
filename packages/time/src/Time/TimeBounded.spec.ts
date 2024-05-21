import { describe, it, expect } from 'vitest';
import { TimeBounded } from './TimeBounded.js';

describe('TimeBounded', () => {
  const minValue = -8.64e15;
  const maxValue = 8.64e15;

  describe('.minValue', () => {
    it(`should be ${minValue}`, () => {
      expect(TimeBounded.minValue).toBe(minValue);
    });
  });
  describe('.maxValue', () => {
    it(`should be ${maxValue}`, () => {
      expect(TimeBounded.maxValue).toBe(maxValue);
    });
  });
});
