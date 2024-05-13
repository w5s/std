import { describe, expect, it } from 'vitest';
import { describeNumeric } from '@w5s/core/dist/testing.js';
import { BigDecimalNumeric } from './BigDecimalNumeric.js';
import { BigDecimalComparable } from './BigDecimalComparable.js';
import { BigDecimal } from './BigDecimal.js';

describe('BigDecimalNumeric', () => {
  describeNumeric({ describe, it, expect })(
    {
      ...BigDecimalComparable,
      ...BigDecimalNumeric,
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
      '+': [
        { call: [BigDecimal('0'), BigDecimal('0')], returns: BigDecimal('0') },
        { call: [BigDecimal('1.01'), BigDecimal('2.2')], returns: BigDecimal('3.21') },
      ],
      '-': [
        { call: [BigDecimal('0'), BigDecimal('0')], returns: BigDecimal('0') },
        { call: [BigDecimal('2.5'), BigDecimal('0.01')], returns: BigDecimal('2.49') },
      ],
      '*': [
        { call: [BigDecimal('0'), BigDecimal('0')], returns: BigDecimal('0') },
        // { call: [BigDecimal('2.2'), BigDecimal('0.5')], returns: BigDecimal('1.1') },
      ],
    }
  );
});
