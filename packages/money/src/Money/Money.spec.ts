import { BigDecimal } from '@w5s/bigdecimal';
import { CodecError, Result } from '@w5s/core';
import { describeAsString, describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { describe, expect, it } from 'vitest';

import { Currency } from '../Currency/Currency.js';
import { CurrencyRegistry } from '../CurrencyRegistry.js';
import { Money } from './Money.js';

describe(Money, () => {
  const anyCurrency = Currency({
    code: 'ANY',
    name: 'Any',
    symbol: 'A',
  });
  const anyAmount = BigDecimal('1');
  const EUR = CurrencyRegistry.getByCode('EUR')!;

  it('should initialize Money', () => {
    expect(Money({ amount: anyAmount, currency: anyCurrency })).toMatchObject({
      _: 'Money',
      amount: anyAmount,
      currency: anyCurrency,
    });
  });
  describeType(Money, () => ({
    inspect: [
      [Money({ amount: BigDecimal('1.1'), currency: anyCurrency }), '1.1ANY'],
      [Money({ amount: BigDecimal('1.1'), currency: EUR }), '1.1EUR'],
    ],
    instances: [
      Money.create({ amount: BigDecimal('1.1'), currency: anyCurrency }),
      { _: 'Money' as const, amount: BigDecimal('1.1'), currency: anyCurrency },
    ],
    notInstances: [],
    typeName: 'Money',
  }));

  describeCodec(Money, () => ({
    decode: [
      ['1.1EUR', Result.Ok(Money({ amount: BigDecimal('1.1'), currency: EUR }))],
      ['EUR', Result.Error(new CodecError({ input: 'EUR', message: 'Cannot decode "EUR" as Money' }))],
      ['BLAH', Result.Error(new CodecError({ input: 'BLAH', message: 'Cannot decode "BLAH" as Money' }))],
      [1, Result.Error(new CodecError({ input: 1, message: 'Cannot decode 1 as Money' }))],
    ],
    encode: [
      [Money({ amount: BigDecimal('0'), currency: anyCurrency }), '0ANY'],
      [Money({ amount: BigDecimal('-1.1'), currency: anyCurrency }), '-1.1ANY'],
    ],
    schema: {
      format: 'money',
      type: 'string',
    },
  }));
  describeAsString(Money, () => [
    [Money({ amount: BigDecimal('0'), currency: anyCurrency }), '0ANY'],
    [Money({ amount: BigDecimal('-1.1'), currency: anyCurrency }), '-1.1ANY'],
  ]);
});
