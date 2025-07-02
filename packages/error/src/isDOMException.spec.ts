import { describe, it, expect } from 'vitest';
import { isDOMException } from './isDOMException.js';

describe(isDOMException, () => {
  it('returns true for an error object', () => {
    const error = new DOMException('Test Error', 'BlahError');
    expect(isDOMException(error)).toBe(true);
  });

  it('returns false for standard errors', () => {
    expect(isDOMException(new Error('Test Error'))).toBe(false);
    expect(isDOMException(new TypeError('Test Error'))).toBe(false);
  });

  it('returns false for a non-error object', () => {
    const obj = { name: 'John' };
    expect(isDOMException(obj)).toBe(false);
  });
});
