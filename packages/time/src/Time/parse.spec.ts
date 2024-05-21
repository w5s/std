import { Option } from '@w5s/core';
import { describe, it, expect } from 'vitest';
import { parse } from './parse.js';

describe(parse, () => {
  it('should return None for invalid representations', () => {
    expect(parse('abc')).toBe(Option.None);
    expect(parse('')).toBe(Option.None);
  });
  it('should parse valid string ISO', () => {
    expect(parse('1970-01-01T00:00:00.000Z')).toBe(0);
    expect(parse('2021-05-27T12:55:11.480Z')).toBe(1_622_120_111_480);
  });
});
