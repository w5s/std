import { describe, it, expect } from 'vitest';
import { isError } from './isError.js';

describe(isError, () => {
  it('returns true for an error object', () => {
    const error = new Error('Test Error');
    expect(isError(error)).toBe(true);
  });

  it('returns true for a TypeError sub class', () => {
    const error = new TypeError('Test Error');
    expect(isError(error)).toBe(true);
  });

  it('returns false for a non-error object', () => {
    const obj = { name: 'John' };
    expect(isError(obj)).toBe(false);
  });
});
