import type { Numeric } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { defaultConversion } from '../internal/defaultConversion.js';
import { uncheckedOperator } from '../internal/uncheckedOperator.js';

export function Add(): Numeric.Add<number>;
export function Add<T>(BaseType: NumberConversion<T>): Numeric.Add<T>;
export function Add<T>(BaseType?: NumberConversion<T>): Numeric.Add<T> {
  return {
    '+': uncheckedOperator(BaseType ?? defaultConversion<T>())((left, right) => left + right),
  };
}
