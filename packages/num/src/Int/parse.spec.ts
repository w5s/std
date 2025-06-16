import { describe, expect, it } from 'vitest';
import { Option } from '@w5s/core';
import { parse } from './parse.js';
import { IntBounded } from './IntBounded.js';

describe(parse, () => {
  it('should return a valid parsed integer when radix is omitted', () => {
    expect(parse('0xff')).toBe(Option.Some(255));
  });
  it('should return a valid parsed integer', () => {
    expect(parse('1', 10)).toBe(Option.Some(1));
  });
  it('should return a valid parsed integer using radix', () => {
    expect(parse('A', 16)).toBe(Option.Some(10));
  });
  it('should return a valid float', () => {
    expect(parse('1.1', 10)).toBe(Option.Some(1));
  });
  it('should parse expression bigger than max', () => {
    expect(parse(String(IntBounded.maxValue + 1), 10)).toBe(Option.None);
  });
  it('should parse invalid', () => {
    expect(parse('invalid', 10)).toBe(Option.None);
    expect(parse('', 10)).toBe(Option.None);
  });
});
