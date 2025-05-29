import type { Zero } from '@w5s/core/dist/Numeric/Zero.js';
import { BigDecimalZero } from '@w5s/bigdecimal/dist/BigDecimal/BigDecimalZero.js';
import type { Money } from './Money.js';

const { isZero: bigDecimalIsZero } = BigDecimalZero;

export const MoneyZero: Pick<Zero<Money>, 'isZero'> = {
  isZero: ({ amount }) => bigDecimalIsZero(amount),
};
