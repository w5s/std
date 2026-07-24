import { BigDecimal } from '@w5s/bigdecimal';
import { Option } from '@w5s/core';
import { describe, expect, it } from 'vitest';

import { CurrencyRegistry } from '../CurrencyRegistry.js';
import { Money } from './Money.js';
import { parse } from './parse.js';

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
