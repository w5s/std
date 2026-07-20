import type { Numeric } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { defaultConversion } from '../internal/defaultConversion.js';
import { uncheckedOperator } from '../internal/uncheckedOperator.js';

export function Multiply(): Numeric.Multiply<number>;
export function Multiply<T>(BaseType: NumberConversion<T>): Numeric.Multiply<T>;
export function Multiply<T>(BaseType?: NumberConversion<T>): Numeric.Multiply<T> {
  return {
    '*': uncheckedOperator(BaseType ?? defaultConversion<T>())((left, right) => left * right),
  };
}
