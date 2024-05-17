import { describe, it, expect } from 'vitest';
import { TimeDuration } from './TimeDuration.js';

describe('TimeDuration', () => {
  describe('()', () => {
    it('should throw invariant error', () => {
      expect(() => TimeDuration.of(Number.NaN)).toThrow('NaN is not a valid TimeDuration');
    });
    it.each([
      [1, 1],
      [-1, -1],
      [1.1, 1.1],
    ])('should return an int value', (input, expected) => {
      expect(TimeDuration.of(input)).toBe(expected);
    });
  });
  describe('.milliseconds', () => {
    it('should return an int value', () => {
      expect(TimeDuration.milliseconds(1)).toBe(1);
    });
  });
  describe('.seconds', () => {
    it('should return an int value', () => {
      expect(TimeDuration.seconds(1)).toBe(1000);
    });
  });
  describe('.minutes', () => {
    it('should return an int value', () => {
      expect(TimeDuration.minutes(1)).toBe(1000 * 60);
    });
  });
  describe('.hours', () => {
    it('should return an int value', () => {
      expect(TimeDuration.hours(1)).toBe(1000 * 60 * 60);
    });
  });
  describe('.days', () => {
    it('should return an int value', () => {
      expect(TimeDuration.days(1)).toBe(1000 * 60 * 60 * 24);
    });
  });
});
