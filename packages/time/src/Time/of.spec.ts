import { describe, it, expect } from 'vitest';
import { Time } from './Time.js';
import { of } from './of.js';

describe(of, () => {
  it('should throw invariant error', () => {
    expect(() => Time(-1)).toThrow('-1 is not a valid Time');
    expect(() => Time(Number.NaN)).toThrow('NaN is not a valid Time');
  });
  it('should return unchanged value when positive', () => {
    expect(Time(1)).toBe(1);
  });
});
