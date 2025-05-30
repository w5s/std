import { BigDecimalSigned } from '@w5s/bigdecimal/dist/BigDecimal/BigDecimalSigned.js';
import type { Money } from './Money.js';

const { isPositive: bigDecimalIsPositive, isNegative: bigDecimalIsNegative } = BigDecimalSigned;
interface MoneySigned {
  /**
   * Returns true if the number is positive and false if the number is zero or negative.
   *
   * @category Numeric
   * @param self - the numeric value
   */
  isPositive(this: void, self: Money): boolean;
  /**
   * Returns true if the number is negative and false if the number is zero or positive.
   *
   * @category Numeric
   * @param self - the numeric value
   */
  isNegative(this: void, self: Money): boolean;
}

export const MoneySigned: MoneySigned = {
  isPositive: ({ amount }) => bigDecimalIsPositive(amount),
  isNegative: ({ amount }) => bigDecimalIsNegative(amount),
};
