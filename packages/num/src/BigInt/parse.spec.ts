import { describe, expect, it } from 'vitest';
import { parse } from './parse.js';

describe(parse, () => {
  it.each([
    ['0b10101', 21n],
    ['1024', 1024n],
    ['0x123', 291n],
  ])('(%s) == %s value when valid', (value, expected) => {
    expect(parse(value)).toBe(expected);
  });
  it.each([
    //
    ['', undefined],
    [' ', undefined],
    ['ABC', undefined],
  ])('(%s) returns %s for invalid values', (value, expected) => {
    expect(parse(value)).toBe(expected);
  });
});
