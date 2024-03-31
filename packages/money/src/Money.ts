import { ArgumentError } from '@w5s/error/dist/ArgumentError.js';
import { Struct } from '@w5s/core/dist/Struct.js';
import { Comparable } from '@w5s/core/dist/Comparable.js';
import type { Result } from '@w5s/core';
import { BigDecimal } from '@w5s/bigdecimal';
import { Currency } from './Currency.js';

export interface Money
  extends Struct<{
    [Struct.type]: 'Money';
    /**
     * Amount of currency
     */
    amount: BigDecimal;
    /**
     * Currency unit
     */
    currency: Currency;
  }> {}

const createOperator =
  (combineFn: (leftAmount: Money['amount'], rightAmount: Money['amount']) => Money['amount']) =>
  (left: Money, right: Money): Result<Money, ArgumentError> =>
    Currency['=='](left.currency, right.currency)
      ? {
          _: 'Ok',
          ok: true,
          value: Money({
            currency: left.currency,
            amount: combineFn(left.amount, right.amount),
          }),
        }
      : {
          _: 'Error',
          ok: false,
          error: ArgumentError({
            message: `Incompatible currencies ${left.currency.code} and ${right.currency.code}`,
          }),
        };

const MoneyComparable = Comparable<Money>({
  compare: (left, right) => {
    const comparison = Currency.compare(left.currency, right.currency);
    return comparison === 0 ? BigDecimal.compare(left.amount, right.amount) : comparison;
  },
});
const MoneyStruct = Struct.Make<Money>('Money');

/**
 * @namespace
 */
export const Money = Object.assign(MoneyStruct, {
  ...MoneyComparable,

  /**
   * Addition operator
   *
   * @example
   * ```typescript
   * Money['+'](EUR(1), EUR(2));// Result.Ok(EUR(1))
   * Money['+'](EUR(1), USD(2));// Result.Error(ArgumentError({ message: 'Incompatible currencies EUR and USD' }))
   * ```
   * @param left - Left operand currency
   * @param right - Right operand currency
   */
  '+': createOperator(BigDecimal['+']),

  /**
   * Subtract operator
   *
   * @example
   * ```typescript
   * Money['-'](EUR(2), EUR(1));// Result.Ok(EUR(1))
   * Money['-'](EUR(1), USD(2));// Result.Error(ArgumentError({ message: 'Incompatible currencies EUR and USD' }))
   * ```
   * @param left - Left operand currency
   * @param right - Right operand currency
   */
  '-': createOperator(BigDecimal['-']),
});
