import { describe, it, expect, vi } from 'vitest';
import { Numeric } from './Numeric.js';
import { Int } from '../Int.js';
import type { Ordering } from '../Ordering.js';
import { describeSigned } from '../Testing.js';
import { Comparable } from '../Comparable.js';

describe(Numeric, () => {
  interface TestCustom {
    custom: boolean;
    value: number;
  }
  const TestComparable = Comparable({
    compare: (left: TestCustom, right: TestCustom) => Math.sign(left.value - right.value) as Ordering,
  });
  const TestType = {
    ...Numeric({
      compare: TestComparable.compare,
      '+': (left, right) => ({ custom: true, value: (left.value + right.value) as Int }),
      '*': (left, right) => ({ custom: true, value: (left.value * right.value) as Int }),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-unary-minus
      negate: (self) => ({ custom: true, value: -self.value as Int }),
      fromInt: (value: Int) => ({ custom: true, value }),
      asInt: (value) => value.value,
    }),
    ...TestComparable,
  };

  describe('#one', () => {
    it('should return default fromInt(1)', () => {
      expect(TestType.one()).toEqual({ custom: true, value: 1 });
    });
    it('overrides with one when set', () => {
      const one = vi.fn();
      const SomeType = Numeric({
        ...TestComparable,
        ...TestType,
        one,
      });
      expect(SomeType.one).toBe(one);
    });
  });
  describe('#isOne', () => {
    it('should return true when compare to one is 0', () => {
      expect(TestType.isOne({ custom: true, value: Int(1) })).toBe(true);
      expect(TestType.isOne({ custom: true, value: Int(0) })).toBe(false);
    });
    it('overrides with isOne when set', () => {
      const isOne = vi.fn();
      const SomeType = Numeric({
        ...TestComparable,
        ...TestType,
        isOne,
      });
      expect(SomeType.isOne).toBe(isOne);
    });
  });
  describe('#zero', () => {
    it('should return default fromInt(0)', () => {
      expect(TestType.zero()).toEqual({ custom: true, value: 0 });
    });
    it('overrides with zero when set', () => {
      const zero = vi.fn();
      const SomeType = Numeric({
        ...TestComparable,
        ...TestType,
        zero,
      });
      expect(SomeType.zero).toBe(zero);
    });
  });
  describe('#isZero', () => {
    it('should return true when compare to zero is 0', () => {
      expect(TestType.isZero({ custom: true, value: Int(0) })).toBe(true);
      expect(TestType.isZero({ custom: true, value: Int(1) })).toBe(false);
    });
    it('overrides with isZero when set', () => {
      const isZero = vi.fn();
      const SomeType = Numeric({
        ...TestComparable,
        ...TestType,
        isZero,
      });
      expect(SomeType.isZero).toBe(isZero);
    });
  });
  describe('#negate', () => {
    it('should negate the value', () => {
      expect(TestType.negate({ custom: true, value: Int(2) })).toEqual({ custom: true, value: -2 });
    });
  });
  describe('+', () => {
    it('should add two values', () => {
      expect(TestType['+']({ custom: true, value: Int(2) }, { custom: true, value: Int(3) })).toEqual({
        custom: true,
        value: 5,
      });
    });
  });
  describe('-', () => {
    it('should subtract two values using negate', () => {
      expect(TestType['-']({ custom: true, value: Int(2) }, { custom: true, value: Int(3) })).toEqual({
        custom: true,
        value: -1,
      });
    });
    it('overrides with isZero when set', () => {
      const subtract = vi.fn();
      const SomeType = Numeric({
        ...TestComparable,
        ...TestType,
        '-': subtract,
      });
      expect(SomeType['-']).toBe(subtract);
    });
  });
  describe('*', () => {
    it('overrides with "*" when set', () => {
      const multiply = vi.fn();
      const SomeType = Numeric({
        ...TestComparable,
        ...TestType,
        '*': multiply,
      });
      expect(SomeType['*']).toBe(multiply);
    });
  });
  describeSigned(TestType, {
    values: () => [
      {
        value: TestType.fromInt(Int(-2)),
        type: 'negative',
        sign: TestType.fromInt(Int(-1)),
        abs: TestType.fromInt(Int(2)),
      },
      {
        value: TestType.fromInt(Int(-1)),
        type: 'negative',
        sign: TestType.fromInt(Int(-1)),
        abs: TestType.fromInt(Int(1)),
      },
      { value: TestType.fromInt(Int(0)), type: 'zero', sign: TestType.fromInt(Int(0)), abs: TestType.fromInt(Int(0)) },
      {
        value: TestType.fromInt(Int(1)),
        type: 'positive',
        sign: TestType.fromInt(Int(1)),
        abs: TestType.fromInt(Int(1)),
      },
      {
        value: TestType.fromInt(Int(2)),
        type: 'positive',
        sign: TestType.fromInt(Int(1)),
        abs: TestType.fromInt(Int(2)),
      },
    ],
  });
});
