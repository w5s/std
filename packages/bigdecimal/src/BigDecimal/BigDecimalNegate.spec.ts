import { describe, it, expect } from 'vitest';
import { describeNegate } from '@w5s/core/dist/Testing.js';
import { BigDecimalNegate } from './BigDecimalNegate.js';
import { BigDecimalComparable } from './BigDecimalComparable.js';
import { BigDecimal } from './BigDecimal.js';

describe('BigDecimalNegate', () => {
  describeNegate({ describe, it, expect })(
    { ...BigDecimalNegate, ...BigDecimalComparable },
    {
      values: () => [
        [BigDecimal('0'), BigDecimal('0')],
        [BigDecimal('0.5'), BigDecimal('-0.5')],
        [BigDecimal('1'), BigDecimal('-1')],
      ],
    },
  );
});
