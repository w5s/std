import type { Numeric } from '@w5s/core';
import { BigDecimalSigned } from '@w5s/bigdecimal/dist/BigDecimal/BigDecimalSigned.js';
import { Money } from './Money.js';

const { isPositive: bigDecimalIsPositive, isNegative: bigDecimalIsNegative } = BigDecimalSigned;

export const MoneySigned: Pick<Numeric.Signed<Money>, 'isNegative' | 'isPositive'> = {
  isPositive: ({ amount }) => bigDecimalIsPositive(amount),
  isNegative: ({ amount }) => bigDecimalIsNegative(amount),
};
