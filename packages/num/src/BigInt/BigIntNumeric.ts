import type { Numeric } from '@w5s/core/dist/Numeric.js';

interface BigIntNumeric
  extends Numeric.Add<bigint>,
    Numeric.Multiply<bigint>,
    Numeric.Power<bigint>,
    Numeric.Subtract<bigint> {}

export const BigIntNumeric: BigIntNumeric = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '**': (left, right) => left ** right,
};
