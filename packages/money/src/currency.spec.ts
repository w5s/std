import { describe, expect, test } from '@jest/globals';
import { Int } from '@w5s/core';
import { Currency } from './currency.js';

describe('Currency', () => {
  const anyProperties = {
    name: 'Name',
    namePlural: 'Name plural',
    precision: Int(2),
    code: 'EUR',
    rounding: Int(0),
    symbol: '$',
    symbolNative: '$',
  };
  const omitProperty = <V, N extends keyof V>(parameters: V, name: N): Omit<V, N> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [name]: _, ...rest } = parameters;
    return rest;
  };
  test('should initialize Currency', () => {
    expect(Currency(anyProperties)).toEqual({
      _: 'Currency',
      ...anyProperties,
    });
  });

  test('should have default rounding', () => {
    const parameters = omitProperty(anyProperties, 'rounding');
    expect(Currency(parameters)).toEqual(
      Currency({
        ...parameters,
        rounding: Int(0),
      })
    );
  });
  test('should have default precision', () => {
    const parameters = omitProperty(anyProperties, 'precision');

    expect(Currency(parameters)).toEqual(
      Currency({
        ...parameters,
        precision: Int(2),
      })
    );
  });
  test('should have default symbolNative to symbol', () => {
    const parameters = omitProperty(anyProperties, 'symbolNative');
    const symbol = 'A';

    expect(Currency({ ...parameters, symbol })).toEqual(
      Currency({
        ...parameters,
        symbol,
        symbolNative: symbol,
      })
    );
  });
  test('should have default namePlural to name', () => {
    const parameters = omitProperty(anyProperties, 'namePlural');
    const name = 'Name test';

    expect(Currency({ ...parameters, name })).toEqual(
      Currency({
        ...parameters,
        name,
        namePlural: name,
      })
    );
  });

  describe('==', () => {
    test('should return false by default', () => {
      const left = Currency({ ...anyProperties, code: 'A' });
      const right = Currency({ ...anyProperties, code: 'B' });
      expect(Currency['=='](left, right)).toBe(false);
    });
    test('should return true if code are the same', () => {
      const left = Currency({ ...anyProperties, code: 'A' });
      const right = Currency({ ...anyProperties, code: 'A' });
      expect(Currency['=='](left, right)).toBe(true);
    });
  });
});
