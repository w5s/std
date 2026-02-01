import type { Numeric } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { __defaultConversion } from './__defaultConversion.js';
import { __uncheckedOperator } from './__uncheckedOperator.js';

export function Remainder(): Numeric.Remainder<number>;
export function Remainder<T>(BaseType: NumberConversion<T>): Numeric.Remainder<T>;
export function Remainder<T>(BaseType?: NumberConversion<T>): Numeric.Remainder<T> {
  return {
    '%': __uncheckedOperator(BaseType ?? __defaultConversion<T>())((left, right) => left % right),
  };
}
