import { describeAsString } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { Currency } from './Currency.js';
import { CurrencyAsString } from './CurrencyAsString.js';

describe('CurrencyAsString', () => {
  const anyProperties = { code: 'ANY', name: 'Any', symbol: '€' };

  describeAsString(CurrencyAsString, () => [
    [Currency({ ...anyProperties, code: 'EUR' }), 'EUR'],
    [Currency({ ...anyProperties, code: 'USD' }), 'USD'],
  ]);
});
