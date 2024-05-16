import type { Numeric } from '../Numeric.js';
import { Int } from '../Type/Int.js';

export const IntNumeric: Numeric<Int> = {
  '+': (left, right) => Int(left + right),
  '-': (left, right) => Int(left - right),
  '*': (left, right) => Int(left * right),
};
