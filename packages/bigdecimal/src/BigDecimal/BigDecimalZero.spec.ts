import { describeZero } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { BigDecimal } from './BigDecimal.js';
import { BigDecimalZero } from './BigDecimalZero.js';

describe('BigDecimalZero', () => {
  describeZero(BigDecimalZero, {
    nonZero: () => [BigDecimal('0.10'), BigDecimal('1')],
  });
});
