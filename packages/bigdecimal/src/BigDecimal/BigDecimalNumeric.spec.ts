import { describe } from 'vitest';
import { describeAdd, describeCheckedRemainder, describeMultiply, describeSubtract } from '@w5s/core/dist/Testing.js';
import { Option } from '@w5s/core';
import { BigDecimalNumeric } from './BigDecimalNumeric.js';
import { BigDecimalComparable } from './BigDecimalComparable.js';
import { BigDecimal } from './BigDecimal.js';

describe('BigDecimalNumeric', () => {
  const subject = {
    ...BigDecimalComparable,
    ...BigDecimalNumeric,
  };
  describeAdd(subject, [
    { call: [BigDecimal('0'), BigDecimal('0')], returns: BigDecimal('0') },
    { call: [BigDecimal('1.01'), BigDecimal('2.2')], returns: BigDecimal('3.21') },
  ]);
  describeSubtract(subject, [
    { call: [BigDecimal('0'), BigDecimal('0')], returns: BigDecimal('0') },
    { call: [BigDecimal('2.5'), BigDecimal('0.01')], returns: BigDecimal('2.49') },
  ]);
  describeMultiply(subject, [
    { call: [BigDecimal('0'), BigDecimal('0')], returns: BigDecimal('0') },
    { call: [BigDecimal('2.2'), BigDecimal('0.5')], returns: BigDecimal('1.10') },
  ]);
  describeCheckedRemainder(subject, [
    { call: [BigDecimal('1'), BigDecimal('0')], returns: Option.None },
    { call: [BigDecimal('5'), BigDecimal('2')], returns: Option.Some(BigDecimal('1')) },
    { call: [BigDecimal('-5'), BigDecimal('2')], returns: Option.Some(BigDecimal('-1')) },
  ]);
});
