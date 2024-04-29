import { describe, expect, it } from 'vitest';
import { isNone } from './isNone.js';
import type { Option } from '../Option.js';

describe(isNone, () => {
  it('should return false for any value', () => {
    expect(isNone({})).toBe(false);
  });
  it('should return true for null or undefined', () => {
    expect(isNone(undefined)).toBe(true);
    expect(isNone(null)).toBe(true);
  });
  it('should narrow type in typescript', () => {
    const anyValue: Option<string> = '';
    if (isNone(anyValue)) {
      // @ts-expect-error anyValue is not a string
      anyValue.trim();
    } else {
      anyValue.trim();
    }
  });
});
