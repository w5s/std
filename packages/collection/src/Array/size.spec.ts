import { describe, expect, it } from 'vitest';
import { size } from './size.js';

describe(size, () => {
  it('should return 0 for empty array', () => {
    expect(size([])).toBe(0);
  });
  it('should return element at index', () => {
    expect(size([1, 2, 3])).toBe(3);
  });
});
