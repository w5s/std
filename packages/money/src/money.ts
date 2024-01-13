import { ArgumentError } from '@w5s/error/dist/argumentError.js';
import { DataObject } from '@w5s/core/dist/dataObject.js';
import { Comparable } from '@w5s/core/dist/comparable.js';
import type { Result } from '@w5s/core';
import { Currency } from './currency.js';

export type Amount = number;

export interface Money
  extends DataObject<{
    [DataObject.type]: 'Money';
    /**
     * Amount of currency
     */
    amount: Amount;
    /**
     * Currency unit
     */
    currency: Currency;
  }> {}

const createOperator =
  (combineFn: (leftAmount: Amount, rightAmount: Amount) => Amount) =>
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
    return comparison === 0 ? (left.amount === right.amount ? 0 : left.amount < right.amount ? -1 : 1) : comparison;
  },
});

export const Money = Object.assign(DataObject.Make<Money>('Money'), {
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
  '+': createOperator((left, right) => left + right),

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
  '-': createOperator((left, right) => left - right),
});
