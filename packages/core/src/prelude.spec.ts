import { describe, it, expect } from 'vitest';
import { constant } from './prelude.js';

describe('constant', () => {
  it.each([1, undefined, {}])('should return the same unchanged value', (value) => {
    expect(constant(value)('abc')).toBe(value);
  });
});
