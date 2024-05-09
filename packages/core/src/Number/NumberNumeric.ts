import type { Numeric } from '../Numeric.js';

export const NumberNumeric: Numeric<number> = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  abs: Math.abs,
  sign: Math.sign,
};
