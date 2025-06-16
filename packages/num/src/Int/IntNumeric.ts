import type { Numeric, Option } from '@w5s/core';
import { fromNumber } from './fromNumber.js';
import type { Int } from '../Int.js';

interface IntNumeric
  extends Numeric.CheckedAdd<Int>,
    Numeric.CheckedMultiply<Int>,
    Numeric.CheckedPower<Int>,
    Numeric.CheckedSubtract<Int> {}

const checked =
  (fn: (left: Int, right: Int) => number) =>
  (left: Int, right: Int): Option<Int> =>
    fromNumber(fn(left, right));

export const IntNumeric: IntNumeric = {
  '+?': checked((left, right) => left + right),
  '-?': checked((left, right) => left - right),
  '*?': checked((left, right) => left * right),
  '**?': checked((left, right) => (right < 0 ? Number.NaN : left ** right)),
};
