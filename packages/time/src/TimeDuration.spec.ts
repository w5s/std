import { describe, it, expect } from 'vitest';
import { TimeDuration } from './TimeDuration.js';
import { TimeDurationSigned } from './TimeDuration/TimeDurationSigned.js';
import { TimeDurationComparable } from './TimeDuration/TimeDurationComparable.js';
import { of } from './TimeDuration/of.js';
import { TimeDurationNumeric } from './TimeDuration/TimeDurationNumeric.js';

describe('TimeDuration', () => {
  it('is an alias to functions', () => {
    expect(TimeDuration).toEqual(expect.objectContaining(TimeDurationSigned));
    expect(TimeDuration).toEqual(expect.objectContaining(TimeDurationComparable));
    expect(TimeDuration).toEqual(expect.objectContaining(TimeDurationNumeric));
    expect(TimeDuration).toEqual(
      expect.objectContaining({
        of,
      }),
    );
  });
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
});
