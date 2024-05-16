import type { Int } from '../Int.js';
import type { Numeric } from '../Numeric.js';

export const IntSigned: Numeric.Signed<Int> = {
  abs: Math.abs as Numeric.Signed<Int>['abs'],
  sign: Math.sign as Numeric.Signed<Int>['sign'],
};
