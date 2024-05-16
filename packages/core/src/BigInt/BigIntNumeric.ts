import type { Numeric } from '../Numeric.js';

export const BigIntNumeric: Numeric<bigint> = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
};
