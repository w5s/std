import { describe, expect, it } from 'vitest';

import { TimeDuration } from './TimeDuration.js';
import { from } from './TimeDuration/from.js';
import { of } from './TimeDuration/of.js';
import { TimeDurationAsString } from './TimeDuration/TimeDurationAsString.js';
import { TimeDurationComparable } from './TimeDuration/TimeDurationComparable.js';
import { TimeDurationNegate } from './TimeDuration/TimeDurationNegate.js';
import { TimeDurationNumeric } from './TimeDuration/TimeDurationNumeric.js';
import { TimeDurationSigned } from './TimeDuration/TimeDurationSigned.js';
import { TimeDurationZero } from './TimeDuration/TimeDurationZero.js';
import { toDays } from './TimeDuration/toDays.js';
import { toHours } from './TimeDuration/toHours.js';
import { toMinutes } from './TimeDuration/toMinutes.js';
import { toSeconds } from './TimeDuration/toSeconds.js';
import { toWeeks } from './TimeDuration/toWeeks.js';

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
        from,
        of,
        toDays,
        toHours,
        toMinutes,
        toSeconds,
        toWeeks,
      }),
    );
  });
  describe('()', () => {
    it('should throw invariant error', () => {
      expect(() => TimeDuration(NaN)).toThrow('NaN is not a valid TimeDuration');
    });
    it.each([
      [1, 1],
      [-1, -1],
      [1.1, 1.1],
      [{ milliseconds: 3, minutes: 1, seconds: 2 }, 62_003],
    ])('should return an int value', (input, expected) => {
      expect(TimeDuration(input)).toBe(expected);
    });
  });
});
