import { describe, expect, it } from 'vitest';
import { BigDecimal } from '@w5s/bigdecimal';
import { describeCodec } from '@w5s/core/dist/Testing.js';
import { CodecError, Result } from '@w5s/core';
import { Money } from './Money.js';
import { Currency } from '../Currency/Currency.js';
import { CurrencyRegistry } from '../CurrencyRegistry.js';

describe(Money, () => {
  const anyCurrency = Currency({
    name: 'Any',
    code: 'ANY',
    symbol: 'A',
  });
  const anyAmount = BigDecimal('1');
  const EUR = CurrencyRegistry.getByCode('EUR')!;

  it('should initialize Money', () => {
    expect(Money({ currency: anyCurrency, amount: anyAmount })).toEqual({
      _: 'Money',
      currency: anyCurrency,
      amount: anyAmount,
    });
  });

  describeCodec({ describe, it, expect })(Money, {
    decode: [
      ['1.1EUR', Result.Ok(Money({ currency: EUR, amount: BigDecimal('1.1') }))],
      ['EUR', Result.Error(new CodecError({ message: 'Cannot decode "EUR" as Money', input: 'EUR' }))],
      ['BLAH', Result.Error(new CodecError({ message: 'Cannot decode "BLAH" as Money', input: 'BLAH' }))],
      [1, Result.Error(new CodecError({ message: 'Cannot decode 1 as Money', input: 1 }))],
    ],
    encode: [
      [Money({ currency: anyCurrency, amount: BigDecimal('0') }), '0ANY'],
      [Money({ currency: anyCurrency, amount: BigDecimal('-1.1') }), '-1.1ANY'],
    ],
    schema: () => ({
      type: 'string',
      format: 'money',
    }),
  });
});
