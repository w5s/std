import type { Numeric } from '../Numeric.js';

interface NumberNumeric extends Numeric.Add<number>, Numeric.Multiply<number>, Numeric.Subtract<number> {}

export const NumberNumeric: NumberNumeric = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
};
