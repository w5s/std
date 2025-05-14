import { describe, it, expect } from 'vitest';
import { asString } from './asString.js';
import { from } from './from.js';

describe(asString, () => {
  it('should handle zero', () => {
    expect(asString(from({ milliseconds: 0 }))).toBe('0ms');
  });

  it('should handle milliseconds', () => {
    expect(asString(from({ milliseconds: 999 }))).toBe('999ms');
  });

  it('should handle negative numbers', () => {
    expect(asString(from({ milliseconds: -999 }))).toBe('-999ms');
  });
});
