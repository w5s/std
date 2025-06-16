import { describe, it, expect } from 'vitest';
import { Option } from '@w5s/core';
import { parse } from './parse.js';

describe(parse, () => {
  it('should return a valid float', () => {
    expect(parse('1.1')).toBe(Option.Some(1.1));
  });
  it('returns None for invalid values', () => {
    expect(parse('A')).toBe(Option.None);
  });
});
