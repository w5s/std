import type { Numeric } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { __defaultConversion } from './__defaultConversion.js';
import { __uncheckedOperator } from './__uncheckedOperator.js';

export function Add(): Numeric.Add<number>;
export function Add<T>(BaseType: NumberConversion<T>): Numeric.Add<T>;
export function Add<T>(BaseType?: NumberConversion<T>): Numeric.Add<T> {
  return {
    '+': __uncheckedOperator(BaseType ?? __defaultConversion<T>())((left, right) => left + right),
  };
}
