import { describe, expect, test } from '@jest/globals';
import { Currency } from './currency.js';
import { Money } from './money.js';

describe(Money, () => {
  const anyCurrency = Currency({
    name: 'Any',
    code: 'ANY',
    symbol: 'A',
  });
  const anyAmount = 1;
  test('should initialize Money', () => {
    expect(Money({ currency: anyCurrency, amount: anyAmount })).toEqual({
      _: 'Money',
      currency: anyCurrency,
      amount: anyAmount,
    });
  });

  describe('==', () => {
    test.each([
      [Money({ currency: anyCurrency, amount: anyAmount }), Money({ currency: anyCurrency, amount: anyAmount }), true],
      [
        Money({ currency: anyCurrency, amount: anyAmount }),
        Money({ currency: anyCurrency, amount: anyAmount + 1 }),
        false,
      ],
      [
        Money({ currency: anyCurrency, amount: anyAmount }),
        Money({ currency: { ...anyCurrency, code: 'TMP' }, amount: anyAmount }),
        false,
      ],
    ])('should return by default false', (left, right, expected) => {
      expect(Money['=='](left, right)).toEqual(expected);
    });
  });
});
