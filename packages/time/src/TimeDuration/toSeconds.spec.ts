import { describe, it, expect } from 'vitest';
import { toSeconds } from './toSeconds.js';
import { TimeDuration } from './TimeDuration.js';

describe(toSeconds, () => {
  it('should convert milliseconds to seconds', () => {
    expect(toSeconds(TimeDuration(1000))).toBe(1);
    expect(toSeconds(TimeDuration(2500))).toBe(2.5);
    expect(toSeconds(TimeDuration(0))).toBe(0);
    expect(toSeconds(TimeDuration(-1000))).toBe(-1);
  });

  it('should truncate seconds if specified', () => {
    expect(toSeconds(TimeDuration(1500), true)).toBe(1);
    expect(toSeconds(TimeDuration(2500), true)).toBe(2);
    expect(toSeconds(TimeDuration(0), true)).toBe(0);
    expect(toSeconds(TimeDuration(-1500), true)).toBe(-1);
  });
});
