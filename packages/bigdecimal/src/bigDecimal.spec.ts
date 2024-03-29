import { describe, expect, it } from 'vitest';
import { describeComparable, describeNumeric } from '@w5s/core/dist/testing.js';
import { BigDecimal } from './bigDecimal.js';

describe('BigDecimal', () => {
  describe('()', () => {
    it('constructs from parameters', () => {
      expect(BigDecimal(1n, 100)).toEqual({
        _: 'BigDecimal',
        value: 1n,
        scale: 100,
      });
    });
    it('constructs from string', () => {
      expect(BigDecimal('2')).toEqual(BigDecimal(2n, 0));
      expect(BigDecimal('-2')).toEqual(BigDecimal(-2n, 0));
      expect(BigDecimal('0.123')).toEqual(BigDecimal(123n, 3));
      expect(BigDecimal('200')).toEqual(BigDecimal(200n, 0));
      expect(BigDecimal('20000000')).toEqual(BigDecimal(20_000_000n, 0));
      expect(BigDecimal('-20000000')).toEqual(BigDecimal(-20_000_000n, 0));
      expect(BigDecimal('2.00')).toEqual(BigDecimal(200n, 2));
      expect(BigDecimal('0.0000200')).toEqual(BigDecimal(200n, 7));
      // expect(BigDecimal('')).toEqual(BigDecimal.normalize(BigDecimal(0n, 0)));
      // @ts-expect-error A is not valid
      expect(() => BigDecimal('A')).toThrow(new Error('A is not a valid BigDecimal'));
      expect(() => BigDecimal('1E5')).toThrow(new Error('1E5 is not a valid BigDecimal'));
    });
  });
  describe('of', () => {
    it('constructs from parameters', () => {
      expect(BigDecimal.of(1n, 100)).toEqual({
        _: 'BigDecimal',
        value: 1n,
        scale: 100,
      });
    });
  });
  describe('parse', () => {
    it.each([
      ['2', BigDecimal(2n, 0)],
      ['-2', BigDecimal(-2n, 0)],
      ['0.123', BigDecimal(123n, 3)],
      ['200', BigDecimal(200n, 0)],
      ['20000000', BigDecimal(20_000_000n, 0)],
      ['-20000000', BigDecimal(-20_000_000n, 0)],
      ['2.00', BigDecimal(200n, 2)],
      ['0.0000200', BigDecimal(200n, 7)],
      ['A', undefined],
      ['1E5', undefined],
    ])('constructs from string', (expression, expected) => {
      expect(BigDecimal.parse(expression)).toEqual(expected);
    });
  });
  describe('format', () => {
    it.each([
      [BigDecimal('2'), '2'],
      [BigDecimal('-2'), '-2'],
      [BigDecimal('0.123'), '0.123'],
      [BigDecimal('-0.123'), '-0.123'],
      [BigDecimal('200'), '200'],
      [BigDecimal('2.00'), '2.00'],
    ])('returns string conversion', (bigDecimal, expected) => {
      expect(BigDecimal.format(bigDecimal), expected);
    });
  });
  describe('scale', () => {
    it('returns identity if scale is the same', () => {
      const value = BigDecimal('3.0005');
      expect(BigDecimal.scale(value, value.scale)).toStrictEqual(value);
    });
    it('returns a down scaled BigDecimal', () => {
      const value = BigDecimal('3.0005');
      expect(BigDecimal.scale(value, 3)).toStrictEqual(BigDecimal('3.000'));
    });
    it('returns an upper scaled BigDecimal', () => {
      const value = BigDecimal('3.0005');
      expect(BigDecimal.scale(value, 5)).toStrictEqual(BigDecimal('3.00050'));
    });
  });
  describe('normalize', () => {
    it('returns a normalized value (i.e. with no trailing 0 scale)', () => {
      expect(BigDecimal.normalize(BigDecimal('0'))).toEqual(BigDecimal(0n, 0));
      expect(BigDecimal.normalize(BigDecimal('0.123000'))).toEqual(BigDecimal(123n, 3));
      expect(BigDecimal.normalize(BigDecimal('123.000'))).toEqual(BigDecimal(123n, 0));
      expect(BigDecimal.normalize(BigDecimal('-0.000123000'))).toEqual(BigDecimal(-123n, 6));
      expect(BigDecimal.normalize(BigDecimal('-123.000'))).toEqual(BigDecimal(-123n, 0));
      expect(BigDecimal.normalize(BigDecimal('12300000'))).toEqual(BigDecimal(123n, -5));
    });
  });
  describeComparable({ describe, it, expect })(BigDecimal, {
    ordered: () => [
      BigDecimal('-10.0'),
      BigDecimal('-0.11'),
      BigDecimal('-0.1'),
      BigDecimal('0'),
      BigDecimal('0.1'),
      BigDecimal('0.11'),
      BigDecimal('10.0'),
    ],
    equivalent: () => [
      [BigDecimal('0'), BigDecimal('0')],
      [BigDecimal('1.0'), BigDecimal('1')],
      [BigDecimal('0.1'), BigDecimal('0.1')],
      [BigDecimal('-0.1'), BigDecimal('-0.1')],
    ],
  });
  describeNumeric({ describe, it, expect })(BigDecimal, {
    sign: [
      { call: [BigDecimal('0')], returns: BigDecimal('0') },
      { call: [BigDecimal('1.2')], returns: BigDecimal('1') },
      { call: [BigDecimal('-1.2')], returns: BigDecimal('-1') },
    ],
    abs: [
      { call: [BigDecimal('0')], returns: BigDecimal('0') },
      { call: [BigDecimal('1.2')], returns: BigDecimal('1.2') },
      { call: [BigDecimal('-1.2')], returns: BigDecimal('1.2') },
    ],
    '+': [
      { call: [BigDecimal('0'), BigDecimal('0')], returns: BigDecimal('0') },
      { call: [BigDecimal('1.01'), BigDecimal('2.2')], returns: BigDecimal('3.21') },
    ],
    '-': [
      { call: [BigDecimal('0'), BigDecimal('0')], returns: BigDecimal('0') },
      { call: [BigDecimal('2.5'), BigDecimal('0.01')], returns: BigDecimal('2.49') },
    ],
    '*': [
      { call: [BigDecimal('0'), BigDecimal('0')], returns: BigDecimal('0') },
      // { call: [BigDecimal('2.2'), BigDecimal('0.5')], returns: BigDecimal('1.1') },
    ],
  });
});
