import { describe, it, expect } from 'vitest';
import { describeZero } from '@w5s/core/dist/Testing.js';
import { BigDecimalZero } from './BigDecimalZero.js';
import { BigDecimal } from './BigDecimal.js';

describe('BigDecimalZero', () => {
  describeZero({ describe, it, expect })(BigDecimalZero, {
    nonZero: () => [BigDecimal('0.10'), BigDecimal('1')],
  });
});
