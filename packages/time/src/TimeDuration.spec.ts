import { describe, it, expect } from 'vitest';
import { describeComparable, describeNumeric } from '@w5s/core/dist/testing.js';
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
  describeComparable({ describe, it, expect })(TimeDuration, {
    ordered: () => [TimeDuration.of(-1), TimeDuration.of(0), TimeDuration.of(1)],
    equivalent: () => [
      [TimeDuration.of(0), TimeDuration.of(0)],
      [TimeDuration.of(1), TimeDuration.of(1)],
      [TimeDuration.of(1.1), TimeDuration.of(1.1)],
    ],
  });
  describeNumeric({ describe, it, expect })(TimeDuration, {
    abs: [
      { call: [TimeDuration.of(-1)], returns: 1 },
      { call: [TimeDuration.of(0)], returns: 0 },
      { call: [TimeDuration.of(1)], returns: 1 },
    ],
    sign: [
      { call: [TimeDuration.of(-6)], returns: -1 },
      { call: [TimeDuration.of(0)], returns: 0 },
      { call: [TimeDuration.of(6)], returns: 1 },
    ],
    '+': [
      { call: [TimeDuration.of(1), TimeDuration.of(1)], returns: 2 },
      { call: [TimeDuration.of(1), TimeDuration.of(-1)], returns: 0 },
    ],
    '-': [
      { call: [TimeDuration.of(1), TimeDuration.of(1)], returns: 0 },
      { call: [TimeDuration.of(1), TimeDuration.of(-1)], returns: 2 },
    ],
    '*': [
      { call: [TimeDuration.of(1), TimeDuration.of(1)], returns: 1 },
      { call: [TimeDuration.of(2), TimeDuration.of(3)], returns: 6 },
      { call: [TimeDuration.of(3), TimeDuration.of(2)], returns: 6 },
    ],
  });
});
