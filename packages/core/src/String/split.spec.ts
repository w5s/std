import { describe, expect, it } from 'vitest';
import { size } from './size.js';

describe(size, () => {
  it('should return 0 for empty string', () => {
    expect(size('')).toBe(0);
  });
  it('should return string length', () => {
    expect(size('abc')).toBe(3);
  });
});
