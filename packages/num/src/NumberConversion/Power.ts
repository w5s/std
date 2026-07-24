import type { Numeric } from '@w5s/core';

import type { NumberConversion } from '../NumberConversion.js';

import { defaultConversion } from '../internal/defaultConversion.js';
import { uncheckedOperator } from '../internal/uncheckedOperator.js';

export function Power(): Numeric.Power<number>;
export function Power<T>(BaseType: NumberConversion<T>): Numeric.Power<T>;
export function Power<T>(BaseType?: NumberConversion<T>): Numeric.Power<T> {
  return {
    '**': uncheckedOperator(BaseType ?? defaultConversion<T>())((left, right) => left ** right),
  };
}
