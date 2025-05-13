import { describe, it, expect } from 'vitest';
import { toMinutes } from './toMinutes.js';
import { TimeDuration } from './TimeDuration.js';

describe(toMinutes, () => {
  it('should convert milliseconds to minutes', () => {
    expect(toMinutes(TimeDuration(60_000))).toBe(1);
    expect(toMinutes(TimeDuration(150_000))).toBe(2.5);
    expect(toMinutes(TimeDuration(0))).toBe(0);
    expect(toMinutes(TimeDuration(-60_000))).toBe(-1);
  });

  it('should truncate minutes if specified', () => {
    expect(toMinutes(TimeDuration(30_000), true)).toBe(0);
    expect(toMinutes(TimeDuration(150_000), true)).toBe(2);
    expect(toMinutes(TimeDuration(0), true)).toBe(0);
    expect(toMinutes(TimeDuration(-150_000), true)).toBe(-2);
  });
});
