import type { Numeric } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { __defaultConversion } from './__defaultConversion.js';
import { __uncheckedOperator } from './__uncheckedOperator.js';

export function Power(): Numeric.Power<number>;
export function Power<T>(BaseType: NumberConversion<T>): Numeric.Power<T>;
export function Power<T>(BaseType?: NumberConversion<T>): Numeric.Power<T> {
  return {
    '**': __uncheckedOperator(BaseType ?? __defaultConversion<T>())((left, right) => left ** right),
  };
}
