import { describe, expect, it } from 'vitest';
import { format } from './format.js';
import { Int } from '../Int.js';

describe(format, () => {
  it('should return a valid string representation', () => {
    expect(format(Int(123), 10)).toBe('123');
  });
  it('should return a valid string representation when radix is omitted', () => {
    expect(format(Int(123))).toBe('123');
  });
});
