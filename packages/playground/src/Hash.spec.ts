import { describe, it, expect } from 'vitest';
import { Int } from '@w5s/core';
import { Hash } from './Hash.js';

describe(`Hash`, () => {
  describe('.from', () => {
    // compliant with https://github.com/immutable-js/immutable-js/blob/master/__tests__/hash.ts

    it('for true', () => {
      expect(Hash.from(true)).toBe(0x42_10_84_21);
    });
    it('for false', () => {
      expect(Hash.from(false)).toBe(0x42_10_84_20);
    });
    it('for undefined', () => {
      expect(Hash.from(undefined)).toBe(0x42_10_84_23);
    });
    it('for null', () => {
      expect(Hash.from(null)).toBe(0x42_10_84_22);
    });
    it('for number', () => {
      expect(Hash.from(0)).toBe(0);
      expect(Hash.from(123)).toBe(123);
      expect(Hash.from(-1)).toBe(-1);
      expect(Hash.from(Number.NaN)).toBe(0);
      expect(Hash.from(Number.POSITIVE_INFINITY)).toBe(0);
      expect(Hash.from(Number.NEGATIVE_INFINITY)).toBe(0);
      expect(Hash.from(Number.MAX_SAFE_INTEGER)).toBe(0);
      expect(Hash.from(-Number.MAX_SAFE_INTEGER)).toBe(1);
    });
    it('for string', () => {
      expect(Hash.from('a')).toBe(97);
      expect(Hash.from('foo-bar')).toBe(-682_120_564);
    });

    it('generates different hashes for decimal values', () => {
      expect(Hash.from(123.456)).toBe(884_763_256);
      expect(Hash.from(123.4567)).toBe(887_769_707);
    });

    it('for any value', () => {
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
  describe('.combine', () => {
    it('should combine two hashes', () => {
      expect(Hash.combine(Int(0), Int(1))).toBe(-566_789_702);
      expect(Hash.combine(Int(0), Int(-1))).toBe(-566_789_704);
      expect(Hash.combine(Int(0), Int(0))).toBe(-566_789_703);
      expect(Hash.combine(Int(0x42_10_84_21) /* true */, Int(0x42_10_84_20) /* false */)).toBe(922_592_000);
    });
  });
});
