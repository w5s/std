import { describe, it, expect } from 'vitest';
import { identity, constant } from './prelude.js';

describe('identity', () => {
  it.each([1, undefined, {}])('should return the same unchanged value', (value) => {
    expect(identity(value)).toBe(value);
  });
});
describe('constant', () => {
  it.each([1, undefined, {}])('should return the same unchanged value', (value) => {
    expect(constant(value)('abc')).toBe(value);
  });
});
