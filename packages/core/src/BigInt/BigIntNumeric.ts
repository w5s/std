import type { Numeric } from '../Numeric.js';

interface BigIntNumeric extends Numeric.Add<bigint>, Numeric.Multiply<bigint>, Numeric.Subtract<bigint> {}

export const BigIntNumeric: BigIntNumeric = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
};
