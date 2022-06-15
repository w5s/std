import { describe, test, expect } from '@jest/globals';
import { Int } from './integer.js';
import { Option } from './option.js';

describe(Int, () => {
  const minValue = Number.MIN_SAFE_INTEGER;
  const maxValue = Number.MAX_SAFE_INTEGER;
  describe('.min', () => {
    test(`should be ${minValue}`, () => {
      expect(Int.min).toBe(minValue);
    });
  });
  describe('.max', () => {
    test(`should be ${maxValue}`, () => {
      expect(Int.max).toBe(maxValue);
    });
  });
  describe('.hasInstance', () => {
    test(`should return true for O`, () => {
      expect(Int.hasInstance(0)).toBe(true);
    });
    test(`should return false for float`, () => {
      expect(Int.hasInstance(1.1)).toBe(false);
    });

    test(`should return true for >= minValue or <= maxValue`, () => {
      expect(Int.hasInstance(minValue)).toBe(true);
      expect(Int.hasInstance(maxValue)).toBe(true);
    });
    test(`should return false for < minValue or > maxValue`, () => {
      expect(Int.hasInstance(minValue - 1)).toBe(false);

      expect(Int.hasInstance(maxValue + 1)).toBe(false);
    });
  });

  describe(Int.parse, () => {
    test('should return a valid parsed integer when radix is omitted', () => {
      expect(Int.parse('0xff')).toBe(Option.Some(255));
    });
    test('should return a valid parsed integer', () => {
      expect(Int.parse('1', 10)).toBe(Option.Some(1));
    });
    test('should return a valid parsed integer using radix', () => {
      expect(Int.parse('A', 16)).toBe(Option.Some(10));
    });
    test('should return a valid float', () => {
      expect(Int.parse('1.1', 10)).toBe(Option.Some(1));
    });
    test('should parse expression bigger than max', () => {
      expect(Int.parse('99007199254740991', 10)).toBe(Option.Some(Int.max));
    });
    test('should parse invalid', () => {
      expect(Int.parse('invalid', 10)).toBe(Option.None);
      expect(Int.parse('', 10)).toBe(Option.None);
    });
  });

  describe(Int.stringify, () => {
    test('should return a valid string representation', () => {
      expect(Int.stringify(Int(123), 10)).toBe('123');
    });
    test('should return a valid string representation when radix is omitted', () => {
      expect(Int.stringify(Int(123))).toBe('123');
    });
  });

  describe('()', () => {
    test('should return identity for 0', () => {
      expect(Int(0)).toBe(0);
    });
    test('should return rounded for floats', () => {
      expect(Int(1.1)).toBe(1);
    });
    test('should return rounded for negative floats', () => {
      expect(Int(-1.1)).toBe(-1);
    });
    test('should return identity for min value', () => {
      expect(Int(minValue)).toBe(minValue);
    });
    test('should return identity for max value', () => {
      expect(Int(maxValue)).toBe(maxValue);
    });

    test('should return max value for max value + 1', () => {
      expect(Int(maxValue + 1)).toBe(maxValue);
    });
    test('should return min value for min value - 1', () => {
      expect(Int(minValue - 1)).toBe(minValue);
    });
  });
  describe('type', () => {
    // eslint-disable-next-line jest/expect-expect
    test('should avoid type mismatch', () => {
      const square = (value: Int) => Int(value * value);
      // @ts-expect-error number is not a Int32
      square(0);

      square(Int(0));
    });
  });
});
