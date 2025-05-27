import { describe, it, expect, beforeEach } from 'vitest';
import { Int } from '@w5s/core';
import { ApplicationTest } from '@w5s/application/dist/Testing.js';
import { BigDecimal } from '@w5s/bigdecimal';
import { Currency } from '../Currency.js';
import { CurrencyRegistry } from '../CurrencyRegistry.js';
import { Money } from '../Money.js';
import { factory } from './factory.js';

describe(factory, () => {
  let registry: CurrencyRegistry;
  const TEST = 'TEST';
  beforeEach(() => {
    const app = ApplicationTest('money-test');
    registry = CurrencyRegistry(app);
    registry.add(
      Currency({
        name: 'test',
        code: TEST,
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
        precision: Int(2),
        name: 'test',
        namePlural: 'test',
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
      precision: Int(2),
      name: 'test',
      namePlural: 'test',
      rounding: Int(0),
      symbol: '#',
      symbolNative: '#',
    });
    expect(testFactory(BigDecimal('1'))).toEqual(Money({ currency, amount: BigDecimal('1') }));
  });

  it('should return a new factory by string', () => {
    const testFactory = factory(TEST, {
      registry,
    });
    const currency = Currency({
      code: TEST,
      precision: Int(2),
      name: 'test',
      namePlural: 'test',
      rounding: Int(0),
      symbol: '#',
      symbolNative: '#',
    });
    expect(testFactory('1')).toEqual(Money({ currency, amount: BigDecimal('1') }));
  });
});
