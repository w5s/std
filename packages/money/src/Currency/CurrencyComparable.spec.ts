import { Int } from '@w5s/core';
import { describeComparable } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { Currency } from './Currency.js';
import { CurrencyComparable } from './CurrencyComparable.js';

describe('CurrencyComparable', () => {
  const anyProperties = {
    code: 'EUR',
    name: 'Name',
    namePlural: 'Name plural',
    precision: Int(2),
    rounding: Int(0),
    symbol: '$',
    symbolNative: '$',
  };
  describeComparable(CurrencyComparable, {
    equivalent: () => [
      [Currency({ ...anyProperties, code: 'A' }), Currency({ ...anyProperties, code: 'A' })],
      [Currency({ ...anyProperties, code: 'B' }), Currency({ ...anyProperties, code: 'B' })],
    ],
    ordered: () => [
      Currency({ ...anyProperties, code: 'A' }),
      Currency({ ...anyProperties, code: 'B' }),
      Currency({ ...anyProperties, code: 'C' }),
    ],
  });
});
