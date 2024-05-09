import { describe, expect, it } from 'vitest';
import { format } from './format.js';

describe(format, () => {
  it.each([
    [1024n, 2, '10000000000'],
    [1024n, 10, '1024'],
    [1024n, 16, '400'],
  ])('returns string values', (value, radix, expected) => {
    expect(format(value, radix)).toBe(expected);
  });
});
