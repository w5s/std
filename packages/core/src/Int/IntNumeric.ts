import type { Numeric } from '../Numeric.js';
import { Int } from '../Type/Int.js';
import { fromNumber } from './fromNumber.js';

interface IntNumeric extends Numeric.CheckedAdd<Int>, Numeric.CheckedMultiply<Int>, Numeric.CheckedSubtract<Int> {}

export const IntNumeric: IntNumeric = {
  '+?': (left, right) => fromNumber(left + right),
  '-?': (left, right) => fromNumber(left - right),
  '*?': (left, right) => fromNumber(left * right),
};
