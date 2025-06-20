import { describe, it, expect } from 'vitest';
import { from } from './from.js';
import { of } from './of.js';

describe(from, () => {
  it('should convert number to TimeDuration', () => {
    expect(from(1000)).toEqual(1000);
  });
  it('should convert TimeDuration to itself', () => {
    expect(from(of(1000))).toEqual(1000);
  });
  it('should convert object with milliseconds to TimeDuration', () => {
    expect(from({ milliseconds: 1000 })).toEqual(1000);
  });
  it('should convert object with seconds to TimeDuration', () => {
    expect(from({ seconds: 1 })).toEqual(1000);
  });
  it('should convert object with minutes to TimeDuration', () => {
    expect(from({ minutes: 1 })).toEqual(1000 * 60);
  });
  it('should convert object with hours to TimeDuration', () => {
    expect(from({ hours: 1 })).toEqual(1000 * 60 * 60);
  });
  it('should convert object with days to TimeDuration', () => {
    expect(from({ days: 1 })).toEqual(1000 * 60 * 60 * 24);
  });
  it('should convert object with weeks to TimeDuration', () => {
    expect(from({ weeks: 1 })).toEqual(1000 * 60 * 60 * 24 * 7);
  });
});
