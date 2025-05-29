import { describe, it, expect } from 'vitest';
import { MoneySigned } from './MoneySigned.js';
import { ANY } from '../Testing.js';

describe('MoneySigned', () => {
  describe(MoneySigned.isPositive, () => {
    it('returns true only for positive', () => {
      expect(MoneySigned.isPositive(ANY('0'))).toBe(false);
      expect(MoneySigned.isPositive(ANY('0.0'))).toBe(false);
      expect(MoneySigned.isPositive(ANY('1'))).toBe(true);
      expect(MoneySigned.isPositive(ANY('-1'))).toBe(false);
    });
  });
  describe(MoneySigned.isNegative, () => {
    it('returns true only for negative amount', () => {
      expect(MoneySigned.isNegative(ANY('0'))).toBe(false);
      expect(MoneySigned.isNegative(ANY('0.0'))).toBe(false);
      expect(MoneySigned.isNegative(ANY('1'))).toBe(false);
      expect(MoneySigned.isNegative(ANY('-1'))).toBe(true);
    });
  });
});
