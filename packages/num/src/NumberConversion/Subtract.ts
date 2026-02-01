import type { Numeric } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { __defaultConversion } from './__defaultConversion.js';
import { __uncheckedOperator } from './__uncheckedOperator.js';

export function Subtract(): Numeric.Subtract<number>;
export function Subtract<T>(BaseType: NumberConversion<T>): Numeric.Subtract<T>;
export function Subtract<T>(BaseType?: NumberConversion<T>): Numeric.Subtract<T> {
  return {
    '-': __uncheckedOperator(BaseType ?? __defaultConversion<T>())((left, right) => left - right),
  };
}
