import { describe } from 'vitest';
import { describeAdd, describeMultiply, describeSubtract } from '@w5s/core/dist/Testing.js';
import { BigDecimalNumeric } from './BigDecimalNumeric.js';
import { BigDecimalComparable } from './BigDecimalComparable.js';
import { BigDecimal } from './BigDecimal.js';

describe('BigDecimalNumeric', () => {
  describeAdd(
    {
      ...BigDecimalComparable,
      ...BigDecimalNumeric,
    },
    [
      { call: [BigDecimal('0'), BigDecimal('0')], returns: BigDecimal('0') },
      { call: [BigDecimal('1.01'), BigDecimal('2.2')], returns: BigDecimal('3.21') },
    ],
  );
  describeSubtract(
    {
      ...BigDecimalComparable,
      ...BigDecimalNumeric,
    },
    [
      { call: [BigDecimal('0'), BigDecimal('0')], returns: BigDecimal('0') },
      { call: [BigDecimal('2.5'), BigDecimal('0.01')], returns: BigDecimal('2.49') },
    ],
  );
  describeMultiply(
    {
      ...BigDecimalComparable,
      ...BigDecimalNumeric,
    },
    [
      { call: [BigDecimal('0'), BigDecimal('0')], returns: BigDecimal('0') },
      { call: [BigDecimal('2.2'), BigDecimal('0.5')], returns: BigDecimal('1.10') },
    ],
  );
});
