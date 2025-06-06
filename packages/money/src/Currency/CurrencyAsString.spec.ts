import { describe } from 'vitest';
import { describeAsString } from '@w5s/core/dist/Testing.js';
import { CurrencyAsString } from './CurrencyAsString.js';
import { Currency } from './Currency.js';

describe('CurrencyAsString', () => {
  const anyProperties = { code: 'ANY', symbol: '€', name: 'Any' };

  describeAsString(CurrencyAsString, () => [
    [Currency({ ...anyProperties, code: 'EUR' }), 'EUR'],
    [Currency({ ...anyProperties, code: 'USD' }), 'USD'],
  ]);
});
