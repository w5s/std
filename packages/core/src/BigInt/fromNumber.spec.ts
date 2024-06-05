import { describe, expect, it } from 'vitest';
import { fromNumber } from './fromNumber.js';

describe(fromNumber, () => {
  it.each([
    [0, 0n],
    [1.1, 1n],
    [-1, -1n],
    [Number.NaN, undefined],
    [Number.MAX_SAFE_INTEGER + 1, undefined],
  ])('(%s) == %s', (value, expected) => {
    expect(fromNumber(value)).toBe(expected);
  });
});
