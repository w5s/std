import type { Numeric } from '@w5s/core/dist/Numeric.js';
import type { Int } from '../Int.js';
import { fromInt } from './fromInt.js';

export const BigIntIntegral: Numeric.Integral<bigint> = {
  fromInt,
  asInt: (self) => Number(self) as Int,
  negate: (self) => -self,
  zero: () => 0n,
  isZero: (self) => self === 0n,
  one: () => 1n,
  isOne: (self) => self === 1n,
  abs: (value) => (value < 0n ? -value : value),
  sign: (value) => (value < 0n ? -1n : value > 0n ? 1n : 0n),
  isNegative: (self) => self < 0n,
  isPositive: (self) => self > 0n,

  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  // '**': (left, right) => left ** right,
  '/': (base, divider) => base / divider,
  '%': (base, divider) => base % divider,
  '/%': (base, divider) => [base / divider, base % divider],
};
