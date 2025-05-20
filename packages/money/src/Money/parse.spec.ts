import { describe, expect, it } from 'vitest';
import { Option } from '@w5s/core';
import { BigDecimal } from '@w5s/bigdecimal';
import { parse } from './parse.js';
import { Money } from './Money.js';
import { CurrencyRegistry } from '../CurrencyRegistry.js';

describe(parse, async () => {
  const EUR = CurrencyRegistry.getByCode('EUR')!;

  it('returns a valid parsed money', () => {
    expect(parse('1.3EUR')).toEqual(Option.Some(Money({ amount: BigDecimal('1.3'), currency: EUR })));
  });
  it('parses invalid', () => {
    expect(parse('invalid')).toEqual(Option.None);
    expect(parse('')).toEqual(Option.None);
    expect(parse('1.1')).toEqual(Option.None);
    expect(parse('-1.1')).toEqual(Option.None);
    expect(parse('-ABC')).toEqual(Option.None);
  });
});
