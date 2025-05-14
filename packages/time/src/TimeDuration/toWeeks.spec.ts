import { describe, it, expect } from 'vitest';
import { toWeeks } from './toWeeks.js';
import { TimeDuration } from './TimeDuration.js';

describe(toWeeks, () => {
  it('should convert milliseconds to weeks', () => {
    expect(toWeeks(TimeDuration(604_800_000))).toBe(1);
    expect(toWeeks(TimeDuration(604_800_000 * 1.5))).toBe(1.5);
    expect(toWeeks(TimeDuration(0))).toBe(0);
    expect(toWeeks(TimeDuration(-604_800_000))).toBe(-1);
  });

  it('should truncate weeks if specified', () => {
    expect(toWeeks(TimeDuration(604_800_000), true)).toBe(1);
    expect(toWeeks(TimeDuration(604_800_000 * 1.5), true)).toBe(1);
    expect(toWeeks(TimeDuration(0), true)).toBe(0);
    expect(toWeeks(TimeDuration(-604_800_000), true)).toBe(-1);
  });
});
