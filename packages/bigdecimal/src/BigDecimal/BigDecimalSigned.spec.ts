import { describeSigned } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { BigDecimal } from './BigDecimal.js';
import { BigDecimalComparable } from './BigDecimalComparable.js';
import { BigDecimalSigned } from './BigDecimalSigned.js';

describe('BigDecimalSigned', () => {
  describeSigned(
    {
      ...BigDecimalComparable,
      ...BigDecimalSigned,
    },
    {
      values: () => [
        { abs: BigDecimal('1'), sign: BigDecimal('-1'), type: 'negative', value: BigDecimal('-1') },
        { abs: BigDecimal('0.5'), sign: BigDecimal('-1'), type: 'negative', value: BigDecimal('-0.5') },
        { abs: BigDecimal('0'), sign: BigDecimal('0'), type: 'zero', value: BigDecimal('0') },
        { abs: BigDecimal('0.5'), sign: BigDecimal('1'), type: 'positive', value: BigDecimal('0.5') },
        { abs: BigDecimal('1'), sign: BigDecimal('1'), type: 'positive', value: BigDecimal('1') },
      ],
    },
  );
});
