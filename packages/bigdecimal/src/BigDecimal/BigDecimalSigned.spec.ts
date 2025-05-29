import { describe, expect, it } from 'vitest';
import { describeSigned } from '@w5s/core/dist/Testing.js';
import { BigDecimalSigned } from './BigDecimalSigned.js';
import { BigDecimalComparable } from './BigDecimalComparable.js';
import { BigDecimal } from './BigDecimal.js';

describe('BigDecimalSigned', () => {
  describeSigned({ describe, it, expect })(
    {
      ...BigDecimalComparable,
      ...BigDecimalSigned,
    },
    {
      values: () => [
        { value: BigDecimal('-1'), type: 'negative', sign: BigDecimal('-1'), abs: BigDecimal('1') },
        { value: BigDecimal('-0.5'), type: 'negative', sign: BigDecimal('-1'), abs: BigDecimal('0.5') },
        { value: BigDecimal('0'), type: 'zero', sign: BigDecimal('0'), abs: BigDecimal('0') },
        { value: BigDecimal('0.5'), type: 'positive', sign: BigDecimal('1'), abs: BigDecimal('0.5') },
        { value: BigDecimal('1'), type: 'positive', sign: BigDecimal('1'), abs: BigDecimal('1') },
      ],
    },
  );
});
