import type { Bounded } from './Bounded.js';
import { Comparable } from './Comparable.js';
import type { Numeric } from './Numeric.js';
import type { Type } from './Type.js';

const NumberType: Type<number> = {
  typeName: 'Number',
  hasInstance(anyValue: unknown): anyValue is number {
    return typeof anyValue === 'number';
  },
};

const NumberComparable = Comparable<number>({
  compare(left, right) {
    return left === right ? 0 : left < right ? -1 : 1;
  },
});

const NumberBounded: Bounded<number> = {
  minValue: globalThis.Number.MIN_VALUE,
  maxValue: globalThis.Number.MAX_VALUE,
};

const NumberNumeric: Numeric<number> = {
  '+': (left: number, right: number) => left + right,
  '-': (left: number, right: number) => left - right,
  '*': (left: number, right: number) => left * right,
  abs: Math.abs,
  sign: Math.sign,
};

/**
 * A collection of functions to manipulate `number`
 *
 * @example
 * ```typescript
 * import { Number } from '@w5s/core';
 *
 * const total = [1, 1.5, 2].reduce(Number['+'], 0);// 4.5
 * Number['=='](total, 4.5);// true
 * ```
 * @namespace
 */
export const Number = {
  ...NumberType,
  ...NumberComparable,
  ...NumberNumeric,
  ...NumberBounded,
};
