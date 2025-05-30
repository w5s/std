import { BigDecimalZero } from '@w5s/bigdecimal/dist/BigDecimal/BigDecimalZero.js';
import type { Money } from './Money.js';

const { isZero: bigDecimalIsZero } = BigDecimalZero;

interface MoneyZero {
  /**
   * Returns true if self is equal to the additive identity.
   *
   * @example
   * ```typescript
   * Money.isZero(EUR('0')); // true
   * Money.isZero(EUR('1')); // false
   * ```
   * @category Numeric
   * @param self - the value to test
   */
  isZero(this: void, self: Money): boolean;
}

export const MoneyZero: MoneyZero = {
  isZero: ({ amount }) => bigDecimalIsZero(amount),
};
