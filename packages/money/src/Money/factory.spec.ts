import { BigDecimal } from '@w5s/bigdecimal';
import { Int } from '@w5s/core';
import { beforeEach, describe, expect, it } from 'vitest';

import { Currency } from '../Currency.js';
import { CurrencyRegistry } from '../CurrencyRegistry.js';
import { Money } from '../Money.js';
import { factory } from './factory.js';

describe(factory, () => {
  let registry: CurrencyRegistry;
  const TEST = 'TEST';
  beforeEach(() => {
    const app = { name: 'money-test' };
    registry = CurrencyRegistry(app);
    registry.add(
      Currency({
        code: TEST,
        name: 'test',
        symbol: '#',
      }),
    );
  });

  it('should register a new currency', () => {
    factory(TEST, {
      registry,
    });
    const currency = registry.getByCode(TEST);
    expect(currency).toEqual(
      Currency({
        code: TEST,
        name: 'test',
        namePlural: 'test',
        precision: Int(2),
        rounding: Int(0),
        symbol: '#',
        symbolNative: '#',
      }),
    );
  });
  it('should return a new factory by BigDecimal', () => {
    const testFactory = factory(TEST, {
      registry,
    });
    const currency = Currency({
      code: TEST,
      name: 'test',
      namePlural: 'test',
      precision: Int(2),
      rounding: Int(0),
      symbol: '#',
      symbolNative: '#',
    });
    expect(testFactory(BigDecimal('1'))).toEqual(Money({ amount: BigDecimal('1'), currency }));
  });

  it('should return a new factory by string', () => {
    const testFactory = factory(TEST, {
      registry,
    });
    const currency = Currency({
      code: TEST,
      name: 'test',
      namePlural: 'test',
      precision: Int(2),
      rounding: Int(0),
      symbol: '#',
      symbolNative: '#',
    });
    expect(testFactory('1')).toEqual(Money({ amount: BigDecimal('1'), currency }));
  });
});
