import type { Numeric } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { defaultConversion } from '../internal/defaultConversion.js';
import { uncheckedOperator } from '../internal/uncheckedOperator.js';

export function Remainder(): Numeric.Remainder<number>;
export function Remainder<T>(BaseType: NumberConversion<T>): Numeric.Remainder<T>;
export function Remainder<T>(BaseType?: NumberConversion<T>): Numeric.Remainder<T> {
  return {
    '%': uncheckedOperator(BaseType ?? defaultConversion<T>())((left, right) => left % right),
  };
}
