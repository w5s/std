import type { Result } from '@w5s/core';
import { ArgumentError } from '@w5s/error/dist/ArgumentError.js';
import { Ok } from '@w5s/core/dist/Result/Ok.js';
import { Error } from '@w5s/core/dist/Result/Error.js';
import { BigDecimalNumeric } from '@w5s/bigdecimal/dist/BigDecimal/BigDecimalNumeric.js';
import type { BigDecimal } from '@w5s/bigdecimal';
import { compare as currencyCompare } from '../Currency/compare.js';
import { Money } from './Money.js';

function createOperator(combineFn: (leftAmount: Money['amount'], rightAmount: Money['amount']) => Money['amount']) {
  return (left: Money, right: Money): Result<Money, ArgumentError> =>
    currencyCompare(left.currency, right.currency) === 0
      ? Ok(
          Money({
            currency: left.currency,
            amount: combineFn(left.amount, right.amount),
          }),
        )
      : Error(
          new ArgumentError({
            message: `Incompatible currencies ${left.currency.code} and ${right.currency.code}`,
          }),
        );
}

export const MoneyNumeric: {
  /**
   * Addition operator
   *
   * @example
   * ```typescript
   * Money['+'](EUR(1), EUR(2));// Result.Ok(EUR(1))
   * Money['+'](EUR(1), USD(2));// Result.Error(new ArgumentError({ message: 'Incompatible currencies EUR and USD' }))
   * ```
   * @category Numeric
   * @param left - Left operand money
   * @param right - Right operand money
   */
  '+'(this: void, left: Money, right: Money): Result<Money, ArgumentError>;
  /**
   * Subtract operator
   *
   * @example
   * ```typescript
   * Money['-'](EUR(2), EUR(1));// Result.Ok(EUR(1))
   * Money['-'](EUR(1), USD(2));// Result.Error(new ArgumentError({ message: 'Incompatible currencies EUR and USD' }))
   * ```
   * @category Numeric
   * @param left - Left operand money
   * @param right - Right operand money
   */
  '-'(this: void, left: Money, right: Money): Result<Money, ArgumentError>;
  /**
   * Multiply operator
   *
   * @example
   * ```typescript
   * Money['*'](EUR(2), BigDecimal('2'));// EUR("4")
   * ```
   * @category Numeric
   * @param money - money object
   * @param multiplier - multiplication factor
   */
  '*'(money: Money, multiplier: BigDecimal): Money;
} = {
  '+': createOperator(BigDecimalNumeric['+']),
  '-': createOperator(BigDecimalNumeric['-']),
  '*': (money, multiplier) =>
    Money({
      currency: money.currency,
      amount: BigDecimalNumeric['*'](money.amount, multiplier),
    }),
};
