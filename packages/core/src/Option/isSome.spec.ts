import { describe, expect, it } from 'vitest';
import { isSome } from './isSome.js';
import type { Option } from '../Option.js';

describe(isSome, () => {
  it('should return true for any value', () => {
    expect(isSome({})).toBe(true);
  });
  it('should return true for null or undefined', () => {
    expect(isSome(undefined)).toBe(false);
    expect(isSome(null)).toBe(false);
  });
  it('should narrow type in typescript', () => {
    const anyValue: Option<string> = '';
    if (isSome(anyValue)) {
      anyValue.trim();
    } else {
      // @ts-expect-error anyValue is not a string
      anyValue.trim();
    }
  });
});
