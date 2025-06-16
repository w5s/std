import { describe, expect, it } from 'vitest';
import { Int } from '../Int.js';
import { fromInt } from './fromInt.js';

describe(fromInt, () => {
  it.each([
    [Int(0), 0n],
    [Int(-1), -1n],
    [Int(1), 1n],
    [Int.maxValue, BigInt(Int.maxValue)],
    [Int.minValue, BigInt(Int.minValue)],
  ])('(%s) == %s', (value, expected) => {
    expect(fromInt(value)).toBe(expected);
  });
});
