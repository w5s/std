import { describe, it, expect } from 'vitest';
import { milliseconds } from './milliseconds.js';

describe(milliseconds, () => {
  it('should return an int value', () => {
    expect(milliseconds(1)).toBe(1);
  });
});
