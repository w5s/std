import { describeComparable } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';
import { Int } from '@w5s/core';
import { Currency } from './Currency.js';
import { CurrencyComparable } from './CurrencyComparable.js';

describe('CurrencyComparable', () => {
  const anyProperties = {
    name: 'Name',
    namePlural: 'Name plural',
    precision: Int(2),
    code: 'EUR',
    rounding: Int(0),
    symbol: '$',
    symbolNative: '$',
  };
  describeComparable(CurrencyComparable, {
    ordered: () => [
      Currency({ ...anyProperties, code: 'A' }),
      Currency({ ...anyProperties, code: 'B' }),
      Currency({ ...anyProperties, code: 'C' }),
    ],
    equivalent: () => [
      [Currency({ ...anyProperties, code: 'A' }), Currency({ ...anyProperties, code: 'A' })],
      [Currency({ ...anyProperties, code: 'B' }), Currency({ ...anyProperties, code: 'B' })],
    ],
  });
});
