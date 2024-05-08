import type { Int } from '../Int.js';
import type { Numeric } from '../Numeric.js';
import { from } from './from.js';

export const IntNumeric: Numeric<Int> = {
  '+': (left, right) => from(left + right),
  '-': (left, right) => from(left - right),
  '*': (left, right) => from(left * right),
  abs: Math.abs as Numeric<Int>['abs'],
  sign: Math.sign as Numeric<Int>['sign'],
};
