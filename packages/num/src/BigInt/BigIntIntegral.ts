import type { Numeric } from '@w5s/core/dist/Numeric.js';

import type { Int } from '../Int.js';

import { fromInt } from './fromInt.js';

export const BigIntIntegral: Numeric.Integral<bigint> = {
  '%': (base, divider) => base % divider,
  '*': (left, right) => left * right,
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  // '**': (left, right) => left ** right,
  '/': (base, divider) => base / divider,
  '/%': (base, divider) => [base / divider, base % divider],
  'abs': (value) => (value < 0n ? -value : value),
  'asInt': (self) => Number(self) as Int,
  fromInt,
  'isNegative': (self) => self < 0n,
  'isOne': (self) => self === 1n,

  'isPositive': (self) => self > 0n,
  'isZero': (self) => self === 0n,
  'negate': (self) => -self,
  'one': () => 1n,
  'sign': (value) => (value < 0n ? -1n : value > 0n ? 1n : 0n),
  'zero': () => 0n,
};
