import { describe, expect, it } from 'vitest';
import { describeSigned } from '@w5s/core/dist/testing.js';
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
      sign: [
        { call: [BigDecimal('0')], returns: BigDecimal('0') },
        { call: [BigDecimal('1.2')], returns: BigDecimal('1') },
        { call: [BigDecimal('-1.2')], returns: BigDecimal('-1') },
      ],
      abs: [
        { call: [BigDecimal('0')], returns: BigDecimal('0') },
        { call: [BigDecimal('1.2')], returns: BigDecimal('1.2') },
        { call: [BigDecimal('-1.2')], returns: BigDecimal('1.2') },
      ],
    }
  );
});
