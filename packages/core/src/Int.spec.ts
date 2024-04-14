import { describe, it, expect } from 'vitest';
import { Int } from './Int.js';
import { Option } from './Option.js';
import { describeType, describeComparable, describeNumeric } from './testing.js';
import { Codec, DecodeError } from './Codec.js';
import { Result } from './Result.js';

describe('Int', () => {
  const minValue = Number.MIN_SAFE_INTEGER;
  const maxValue = Number.MAX_SAFE_INTEGER;
  describeType({ describe, it, expect })(Int, {
    typeName: 'Int',
    instances: () => [0, 1, 2, -1, minValue, maxValue],
    notInstances: () => ['1', 1.1, undefined, minValue - 1, maxValue + 1],
  });
  describeComparable({ describe, it, expect })(Int, {
    ordered: () => [Int.of(-1), Int.of(0), Int.of(1)],
    equivalent: () => [
      [Int.of(0), Int.of(0)],
      [Int.of(1), Int.of(1)],
      [Int.of(-1), Int.of(-1)],
    ],
  });
  describeNumeric({ describe, it, expect })(Int, {
    abs: [
      { call: [-1], returns: 1 },
      { call: [0], returns: 0 },
      { call: [1], returns: 1 },
    ],
    sign: [
      { call: [-6], returns: -1 },
      { call: [0], returns: 0 },
      { call: [6], returns: 1 },
    ],
    '+': [
      { call: [1, 1], returns: 2 },
      { call: [1, -1], returns: 0 },
      { call: [1, Int.maxValue], returns: Int.maxValue },
    ],
    '-': [
      { call: [1, 1], returns: 0 },
      { call: [1, -1], returns: 2 },
      { call: [Int.minValue, 1], returns: Int.minValue },
    ],
    '*': [
      { call: [1, 1], returns: 1 },
      { call: [2, 3], returns: 6 },
      { call: [3, 2], returns: 6 },
    ],
  });
  describe('Codec', () => {
    it('decodes values', () => {
      expect(Codec.decode(Int, 1)).toEqual(Result.Ok(Int(1)));
      expect(Codec.decode(Int, null)).toEqual(Result.Error(DecodeError({ message: 'Invalid Int', input: null })));
    });
    it('encodes values', () => {
      expect(Codec.encode(Int, Int(1))).toBe(1);
    });
    it('has schema', () => {
      expect(Codec.schema(Int)).toEqual({
        type: 'integer',
      });
    });
  });
  describe('()', () => {
    it('returns or throw when wrong value', () => {
      expect(Int(1)).toBe(1);
      expect(() => {
        Int(1.1);
      }).toThrow(new Error('Invalid Int'));
    });
  });

  describe('.minValue', () => {
    it(`should be ${minValue}`, () => {
      expect(Int.minValue).toBe(minValue);
    });
  });
  describe('.maxValue', () => {
    it(`should be ${maxValue}`, () => {
      expect(Int.maxValue).toBe(maxValue);
    });
  });

  describe('.parse()', () => {
    it('should return a valid parsed integer when radix is omitted', () => {
      expect(Int.parse('0xff')).toBe(Option.Some(255));
    });
    it('should return a valid parsed integer', () => {
      expect(Int.parse('1', 10)).toBe(Option.Some(1));
    });
    it('should return a valid parsed integer using radix', () => {
      expect(Int.parse('A', 16)).toBe(Option.Some(10));
    });
    it('should return a valid float', () => {
      expect(Int.parse('1.1', 10)).toBe(Option.Some(1));
    });
    it('should parse expression bigger than max', () => {
      expect(Int.parse('99007199254740991', 10)).toBe(Option.Some(Int.maxValue));
    });
    it('should parse invalid', () => {
      expect(Int.parse('invalid', 10)).toBe(Option.None);
      expect(Int.parse('', 10)).toBe(Option.None);
    });
  });

  describe('.format()', () => {
    it('should return a valid string representation', () => {
      expect(Int.format(Int.of(123), 10)).toBe('123');
    });
    it('should return a valid string representation when radix is omitted', () => {
      expect(Int.format(Int.of(123))).toBe('123');
    });
  });

  describe('of()', () => {
    it('should return identity for 0', () => {
      expect(Int.of(0)).toBe(0);
    });
    it('should return rounded for floats', () => {
      expect(Int.of(1.1)).toBe(1);
    });
    it('should return rounded for negative floats', () => {
      expect(Int.of(-1.1)).toBe(-1);
    });
    it('should return identity for min value', () => {
      expect(Int.of(minValue)).toBe(minValue);
    });
    it('should return identity for max value', () => {
      expect(Int.of(maxValue)).toBe(maxValue);
    });

    it('should return max value for max value + 1', () => {
      expect(Int.of(maxValue + 1)).toBe(maxValue);
    });
    it('should return min value for min value - 1', () => {
      expect(Int.of(minValue - 1)).toBe(minValue);
    });
  });
  describe('type', () => {
    it('should avoid type mismatch', () => {
      const square = (value: Int) => Int.of(value * value);
      // @ts-expect-error number is not a Int32
      square(0);

      square(Int.of(0));
    });
  });
});
