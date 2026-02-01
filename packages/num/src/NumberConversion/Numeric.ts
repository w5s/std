import type { Numeric as CoreNumeric } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { __defaultConversion } from './__defaultConversion.js';
import { Add } from './Add.js';
import { Multiply } from './Multiply.js';
import { Subtract } from './Subtract.js';
import { Power } from './Power.js';
import { Remainder } from './Remainder.js';

interface NumberNumeric<T>
  extends
    CoreNumeric.Add<T>,
    CoreNumeric.Multiply<T>,
    CoreNumeric.Remainder<T>,
    CoreNumeric.Subtract<T>,
    CoreNumeric.Power<T> {}

export function Numeric(): NumberNumeric<number>;
export function Numeric<T>(BaseType: NumberConversion<T>): NumberNumeric<T>;
export function Numeric<T>(BaseType?: NumberConversion<T>): NumberNumeric<T> {
  const BaseTypeDefault = BaseType ?? __defaultConversion<T>();
  return {
    ...Add(BaseTypeDefault),
    ...Multiply(BaseTypeDefault),
    ...Subtract(BaseTypeDefault),
    ...Power(BaseTypeDefault),
    ...Remainder(BaseTypeDefault),
  };
}
