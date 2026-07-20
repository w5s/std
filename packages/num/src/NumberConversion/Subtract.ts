import type { Numeric } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { defaultConversion } from '../internal/defaultConversion.js';
import { uncheckedOperator } from '../internal/uncheckedOperator.js';

export function Subtract(): Numeric.Subtract<number>;
export function Subtract<T>(BaseType: NumberConversion<T>): Numeric.Subtract<T>;
export function Subtract<T>(BaseType?: NumberConversion<T>): Numeric.Subtract<T> {
  return {
    '-': uncheckedOperator(BaseType ?? defaultConversion<T>())((left, right) => left - right),
  };
}
