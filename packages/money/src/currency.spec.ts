import { describe, expect, it } from 'vitest';
import { Int } from '@w5s/core';
import { Currency } from './currency.js';
import { describeComparable } from './describeComparable.js';

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
  it('should initialize Currency', () => {
    expect(Currency(anyProperties)).toEqual({
      _: 'Currency',
      ...anyProperties,
    });
  });

  it('should have default rounding', () => {
    const parameters = omitProperty(anyProperties, 'rounding');
    expect(Currency(parameters)).toEqual(
      Currency({
        ...parameters,
        rounding: Int(0),
      })
    );
  });
  it('should have default precision', () => {
    const parameters = omitProperty(anyProperties, 'precision');

    expect(Currency(parameters)).toEqual(
      Currency({
        ...parameters,
        precision: Int(2),
      })
    );
  });
  it('should have default symbolNative to symbol', () => {
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
  it('should have default namePlural to name', () => {
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

  describeComparable(Currency, {
    base: () => Currency({ ...anyProperties, code: 'B' }),
    inferior: () => Currency({ ...anyProperties, code: 'A' }),
    superior: () => Currency({ ...anyProperties, code: 'C' }),
  });
});
