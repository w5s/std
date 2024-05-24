import { describe, expect, it } from 'vitest';
import { describeAdd, describeMultiply, describeSubtract } from '@w5s/core/dist/testing.js';
import { BigDecimalNumeric } from './BigDecimalNumeric.js';
import { BigDecimalComparable } from './BigDecimalComparable.js';
import { BigDecimal } from './BigDecimal.js';

describe('BigDecimalNumeric', () => {
  describeAdd({ describe, it, expect })(
    {
      ...BigDecimalComparable,
      ...BigDecimalNumeric,
    },
    [
      { call: [BigDecimal('0'), BigDecimal('0')], returns: BigDecimal('0') },
      { call: [BigDecimal('1.01'), BigDecimal('2.2')], returns: BigDecimal('3.21') },
    ]
  );
  describeSubtract({ describe, it, expect })(
    {
      ...BigDecimalComparable,
      ...BigDecimalNumeric,
    },
    [
      { call: [BigDecimal('0'), BigDecimal('0')], returns: BigDecimal('0') },
      { call: [BigDecimal('2.5'), BigDecimal('0.01')], returns: BigDecimal('2.49') },
    ]
  );
  describeMultiply({ describe, it, expect })(
    {
      ...BigDecimalComparable,
      ...BigDecimalNumeric,
    },
    [
      { call: [BigDecimal('0'), BigDecimal('0')], returns: BigDecimal('0') },
      { call: [BigDecimal('2.2'), BigDecimal('0.5')], returns: BigDecimal('1.10') },
    ]
  );
});
