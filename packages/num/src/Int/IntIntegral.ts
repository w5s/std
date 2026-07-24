import type { Integral } from '@w5s/core/dist/Numeric/Integral.js';

import type { Int } from '../Int.js';

import { fromNumber } from './fromNumber.js';

const unchecked =
  (fn: (left: Int, right: Int) => number) =>
    (left: Int, right: Int): Int =>

      fromNumber(fn(left, right))!;
const quot = unchecked((base, divider) => base / divider);
const mod = unchecked((base, divider) => base % divider);

export const IntIntegral: Integral<Int> = {
  '%': mod,
  '*': unchecked((left, right) => left * right),
  '+': unchecked((left, right) => left + right),
  '-': unchecked((left, right) => left - right),
  '/': quot,
  '/%': (base, divider) => [quot(base, divider), mod(base, divider)],
  'abs': Math.abs as Integral<Int>['abs'],
  'asInt': (self) => self,
  'fromInt': (self) => self,
  'isNegative': (self) => self < 0,
  'isOne': (self) => self === 1,
  'isPositive': (self) => self > 0,
  'isZero': (self) => self === 0,
  'negate': (self) => -(self as number) as Int,
  'one': () => 1 as Int,
  'sign': Math.sign as Integral<Int>['sign'],
  'zero': () => 0 as Int,
};
