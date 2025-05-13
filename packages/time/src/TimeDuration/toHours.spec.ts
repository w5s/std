import { describe, it, expect } from 'vitest';
import { toHours } from './toHours.js';
import { TimeDuration } from './TimeDuration.js';

describe(toHours, () => {
  it('should convert milliseconds to hours', () => {
    expect(toHours(TimeDuration(3_600_000))).toBe(1);
    expect(toHours(TimeDuration(3_600_000 * 1.5))).toBe(1.5);
    expect(toHours(TimeDuration(0))).toBe(0);
    expect(toHours(TimeDuration(-3_600_000))).toBe(-1);
  });
  it('should truncate minutes if specified', () => {
    expect(toHours(TimeDuration(3_600_000), true)).toBe(1);
    expect(toHours(TimeDuration(3_600_000 * 1.5), true)).toBe(1);
    expect(toHours(TimeDuration(0), true)).toBe(0);
    expect(toHours(TimeDuration(-3_600_000), true)).toBe(-1);
  });
});
