import type { Numeric } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { __defaultConversion } from './__defaultConversion.js';
import { __uncheckedOperator } from './__uncheckedOperator.js';

export function Multiply(): Numeric.Multiply<number>;
export function Multiply<T>(BaseType: NumberConversion<T>): Numeric.Multiply<T>;
export function Multiply<T>(BaseType?: NumberConversion<T>): Numeric.Multiply<T> {
  return {
    '*': __uncheckedOperator(BaseType ?? __defaultConversion<T>())((left, right) => left * right),
  };
}
