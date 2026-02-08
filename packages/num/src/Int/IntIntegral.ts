import type { Integral } from '@w5s/core/dist/Numeric/Integral.js';
import type { Int } from '../Int.js';
import { fromNumber } from './fromNumber.js';

const unchecked =
  (fn: (left: Int, right: Int) => number) =>
  (left: Int, right: Int): Int =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fromNumber(fn(left, right))!;
const quot = unchecked((base, divider) => base / divider);
const mod = unchecked((base, divider) => base % divider);

export const IntIntegral: Integral<Int> = {
  '+': unchecked((left, right) => left + right),
  '-': unchecked((left, right) => left - right),
  '*': unchecked((left, right) => left * right),
  '%': mod,
  '/': quot,
  '/%': (base, divider) => [quot(base, divider), mod(base, divider)],
  fromInt: (self) => self,
  asInt: (self) => self,
  negate: (self) => -(self as number) as Int,
  zero: () => 0 as Int,
  isZero: (self) => self === 0,
  one: () => 1 as Int,
  isOne: (self) => self === 1,
  isNegative: (self) => self < 0,
  isPositive: (self) => self > 0,
  abs: Math.abs as Integral<Int>['abs'],
  sign: Math.sign as Integral<Int>['sign'],
};
