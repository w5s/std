// packages/time/src/TimeDuration/toDays.spec.ts
import { describe, it, expect } from 'vitest';
import { toDays } from './toDays.js';
import { TimeDuration } from './TimeDuration.js';

describe(toDays, () => {
  it('should convert milliseconds to days', () => {
    expect(toDays(TimeDuration(86_400_000))).toBe(1);
    expect(toDays(TimeDuration(86_400_000 * 1.5))).toBe(1.5);
    expect(toDays(TimeDuration(0))).toBe(0);
    expect(toDays(TimeDuration(-86_400_000))).toBe(-1);
  });

  it('should truncate days if specified', () => {
    expect(toDays(TimeDuration(86_400_000), true)).toBe(1);
    expect(toDays(TimeDuration(86_400_000 * 1.5), true)).toBe(1);
    expect(toDays(TimeDuration(0), true)).toBe(0);
    expect(toDays(TimeDuration(-86_400_000), true)).toBe(-1);
  });
});
