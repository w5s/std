import type { Bounded } from '@w5s/core';
import type { Int } from '../Int.js';

interface IntConversion<T> {
  fromInt: (value: Int) => T;
  asInt: (value: T) => Int;
}

export function IntBounded<T = Int>(FromType?: Pick<IntConversion<T>, 'fromInt'>): Bounded<T> {
  const fromInt = FromType?.fromInt ?? ((v: Int) => v as unknown as T);
  return {
    maxValue: fromInt(Number.MAX_SAFE_INTEGER as Int),
    minValue: fromInt(Number.MIN_SAFE_INTEGER as Int),
  };
}
