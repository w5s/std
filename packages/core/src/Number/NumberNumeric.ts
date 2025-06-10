import type { Numeric } from '../Numeric.js';
import type { Option } from '../Option.js';

interface NumberNumeric
  extends Numeric.Add<number>,
    Numeric.Multiply<number>,
    Numeric.Subtract<number>,
    Numeric.Power<number>,
    Numeric.CheckedDivide<number> {}

const filterFinite = (value: number): Option<number> => (Number.isFinite(value) ? value : undefined);

export const NumberNumeric: NumberNumeric = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '**': (left, right) => left ** right,
  '/?': (left, right) => filterFinite(left / right),
};
