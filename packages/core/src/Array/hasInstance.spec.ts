import { describe, expect, it } from 'vitest';
import { hasInstance } from './hasInstance.js';
import { empty } from './empty.js';

describe(hasInstance, () => {
  it('should return true for Array', () => {
    expect(hasInstance(empty())).toEqual(true);
  });
  it('should return false for any other value', () => {
    expect(hasInstance(null)).toBe(false);
    expect(hasInstance({ length: 0 })).toBe(false);
  });
});
