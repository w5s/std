import { describe, it, expect } from 'vitest';
import { MoneyZero } from './MoneyZero.js';
import { ANY } from '../Testing.js';

describe('MoneyZero', () => {
  describe(MoneyZero.isZero, () => {
    it('returns true only for zero amount', () => {
      expect(MoneyZero.isZero(ANY('0'))).toBe(true);
      expect(MoneyZero.isZero(ANY('0.0'))).toBe(true);
      expect(MoneyZero.isZero(ANY('1'))).toBe(false);
    });
  });
});
