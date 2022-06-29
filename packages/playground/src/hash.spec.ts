import { describe, test, expect } from '@jest/globals';
import { Int } from '@w5s/core/lib/integer.js';
import { Hash } from './hash.js';

describe(`Hash`, () => {
  describe(Hash.from, () => {
    // compliant with https://github.com/immutable-js/immutable-js/blob/master/__tests__/hash.ts

    test('for true', () => {
      expect(Hash.from(true)).toBe(0x42_10_84_21);
    });
    test('for false', () => {
      expect(Hash.from(false)).toBe(0x42_10_84_20);
    });
    test('for undefined', () => {
      expect(Hash.from(undefined)).toBe(0x42_10_84_23);
    });
    test('for null', () => {
      expect(Hash.from(null)).toBe(0x42_10_84_22);
    });
    test('for number', () => {
      expect(Hash.from(0)).toBe(0);
      expect(Hash.from(123)).toBe(123);
      expect(Hash.from(-1)).toBe(-1);
      expect(Hash.from(Number.NaN)).toBe(0);
      expect(Hash.from(Number.POSITIVE_INFINITY)).toBe(0);
      expect(Hash.from(Number.NEGATIVE_INFINITY)).toBe(0);
      expect(Hash.from(Number.MAX_SAFE_INTEGER)).toBe(0);
      expect(Hash.from(-Number.MAX_SAFE_INTEGER)).toBe(1);
    });
    test('for string', () => {
      expect(Hash.from('a')).toBe(97);
      expect(Hash.from('foo-bar')).toBe(-682_120_564);
    });

    test('generates different hashes for decimal values', () => {
      expect(Hash.from(123.456)).toBe(884_763_256);
      expect(Hash.from(123.4567)).toBe(887_769_707);
    });

    test('for any value', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(Hash.from({} as any)).toBe(0);
    });

    // test_('generates different hashes for different objects', () => {
    //   const objA = {};
    //   const objB = {};
    //   expect(Hash.from(objA)).toBe(Hash.from(objA));
    //   expect(Hash.from(objA)).not.toBe(Hash.from(objB));
    // });

    // test_('generates different hashes for different functions', () => {
    //   const funA = () => {};
    //   const funB = () => {};
    //   expect(Hash.from(funA)).toBe(Hash.from(funA));
    //   expect(Hash.from(funA)).not.toBe(Hash.from(funB));
    // });
  });
  describe(Hash.combine, () => {
    test('should combine two hashes', () => {
      expect(Hash.combine(Int(0), Int(1))).toBe(-566_789_702);
      expect(Hash.combine(Int(0), Int(-1))).toBe(-566_789_704);
      expect(Hash.combine(Int(0), Int(0))).toBe(-566_789_703);
      expect(Hash.combine(Int(0x42_10_84_21) /* true */, Int(0x42_10_84_20) /* false */)).toBe(922_592_000);
    });
  });
});
