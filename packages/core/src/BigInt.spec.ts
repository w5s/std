import { describe, it, expect } from 'vitest';
import { BigInt } from './BigInt.js';
import { describeType, describeComparable, describeNumeric } from './testing.js';

describe('BigInt', () => {
  describeType({ describe, it, expect })(BigInt, {
    typeName: 'BigInt',
    instances: () => [1n, 0n],
    notInstances: () => ['anything', null, undefined, BigInt.hasInstance],
  });

  describe('.parse', () => {
    it.each([
      ['0b10101', 21n],
      ['1024', 1024n],
      ['0x123', 291n],
    ])('returns bigint values when valid', (value, expected) => {
      expect(BigInt.parse(value)).toBe(expected);
    });
    it.each([
      //
      ['ABC', undefined],
    ])('returns undefined for invalid values', (value, expected) => {
      expect(BigInt.parse(value)).toBe(expected);
    });
  });
  describe('.format', () => {
    it.each([
      [1024n, 2, '10000000000'],
      [1024n, 10, '1024'],
      [1024n, 16, '400'],
    ])('returns string values', (value, radix, expected) => {
      expect(BigInt.format(value, radix)).toBe(expected);
    });
  });

  describeComparable({ describe, it, expect })(BigInt, {
    ordered: () => [-1n, 0, 1n],
    equivalent: () => [
      [0n, 0n],
      [1n, 1n],
      [-2n, -2n],
    ],
  });
  describeNumeric({ describe, it, expect })(BigInt, {
    abs: [
      { call: [-1n], returns: 1n },
      { call: [0n], returns: 0n },
      { call: [1n], returns: 1n },
    ],
    sign: [
      { call: [-6n], returns: -1n },
      { call: [0n], returns: 0n },
      { call: [6n], returns: 1n },
    ],
    '+': [
      { call: [1n, 1n], returns: 2n },
      { call: [1n, -1n], returns: 0n },
    ],
    '-': [
      { call: [1n, 1n], returns: 0n },
      { call: [1n, -1n], returns: 2n },
    ],
    '*': [
      { call: [1n, 1n], returns: 1n },
      { call: [2n, 3n], returns: 6n },
      { call: [3n, 2n], returns: 6n },
    ],
  });
});
