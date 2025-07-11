import { describe, it, expect } from 'vitest';
import { TimeDuration } from './TimeDuration.js';
import { TimeDurationSigned } from './TimeDuration/TimeDurationSigned.js';
import { TimeDurationComparable } from './TimeDuration/TimeDurationComparable.js';
import { of } from './TimeDuration/of.js';
import { from } from './TimeDuration/from.js';
import { TimeDurationNumeric } from './TimeDuration/TimeDurationNumeric.js';
import { toSeconds } from './TimeDuration/toSeconds.js';
import { toMinutes } from './TimeDuration/toMinutes.js';
import { toHours } from './TimeDuration/toHours.js';
import { toDays } from './TimeDuration/toDays.js';
import { toWeeks } from './TimeDuration/toWeeks.js';
import { TimeDurationAsString } from './TimeDuration/TimeDurationAsString.js';
import { TimeDurationNegate } from './TimeDuration/TimeDurationNegate.js';
import { TimeDurationZero } from './TimeDuration/TimeDurationZero.js';

describe('TimeDuration', () => {
  it('is an alias to functions', () => {
    expect(TimeDuration).toEqual(expect.objectContaining(TimeDurationSigned));
    expect(TimeDuration).toEqual(expect.objectContaining(TimeDurationComparable));
    expect(TimeDuration).toEqual(expect.objectContaining(TimeDurationNumeric));
    expect(TimeDuration).toEqual(expect.objectContaining(TimeDurationNegate));
    expect(TimeDuration).toEqual(expect.objectContaining(TimeDurationAsString));
    expect(TimeDuration).toEqual(expect.objectContaining(TimeDurationZero));
    expect(TimeDuration).toEqual(
      expect.objectContaining({
        of,
        from,
        toSeconds,
        toMinutes,
        toHours,
        toDays,
        toWeeks,
      }),
    );
  });
  describe('()', () => {
    it('should throw invariant error', () => {
      expect(() => TimeDuration(Number.NaN)).toThrow('NaN is not a valid TimeDuration');
    });
    it.each([
      [1, 1],
      [-1, -1],
      [1.1, 1.1],
      [{ minutes: 1, seconds: 2, milliseconds: 3 }, 62_003],
    ])('should return an int value', (input, expected) => {
      expect(TimeDuration(input)).toBe(expected);
    });
  });
});
