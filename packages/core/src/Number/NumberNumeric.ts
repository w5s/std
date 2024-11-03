import type { Numeric } from '../Numeric.js';

interface NumberNumeric
  extends Numeric.Add<number>,
    Numeric.Multiply<number>,
    Numeric.Subtract<number>,
    Numeric.CheckedDivide<number> {}

export const NumberNumeric: NumberNumeric = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '/?': (left, right) => {
    const result = left / right;
    return Number.isFinite(result) ? result : undefined;
  },
};
