import type { Numeric } from '../Numeric.js';
import type { Option } from '../Option.js';

interface NumberNumeric
  extends Numeric.Add<number>,
    Numeric.Multiply<number>,
    Numeric.Remainder<number>,
    Numeric.Subtract<number>,
    Numeric.Power<number>,
    Numeric.CheckedDivide<number> {}

const checked =
  (fn: (left: number, right: number) => number) =>
  (left: number, right: number): Option<number> => {
    const result = fn(left, right);
    return Number.isNaN(result) || Number.isFinite(result) ? result : undefined;
  };

export const NumberNumeric: NumberNumeric = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '**': (left, right) => left ** right,
  '%': (left, right) => left % right,
  '/?': checked((left, right) => left / right),
};
