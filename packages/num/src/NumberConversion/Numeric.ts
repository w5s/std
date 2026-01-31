import type { Numeric as CoreNumeric, Option } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { __defaultConversion } from './__defaultConversion.js';
import { Add } from './Add.js';

interface NumberNumeric<T>
  extends
    CoreNumeric.Add<T>,
    CoreNumeric.Multiply<T>,
    CoreNumeric.Remainder<T>,
    CoreNumeric.Subtract<T>,
    CoreNumeric.Power<T>,
    CoreNumeric.CheckedDivide<T> {}

export function Numeric(): NumberNumeric<number>;
export function Numeric<T>(BaseType: NumberConversion<T>): NumberNumeric<T>;
export function Numeric<T>(BaseType?: NumberConversion<T>): NumberNumeric<T> {
  const BaseTypeDefault = BaseType ?? __defaultConversion<T>();
  const { fromNumber, asNumber } = BaseTypeDefault;
  const unchecked =
    (fn: (left: number, right: number) => number) =>
    (left: T, right: T): T =>
      fromNumber(fn(asNumber(left), asNumber(right)));
  const checked =
    (fn: (left: number, right: number) => number) =>
    (left: T, right: T): Option<T> => {
      const result = fn(asNumber(left), asNumber(right));
      return Number.isNaN(result) || Number.isFinite(result) ? fromNumber(result) : undefined;
    };
  return {
    ...Add(BaseTypeDefault),
    '-': unchecked((left, right) => left - right),
    '*': unchecked((left, right) => left * right),
    '**': unchecked((left, right) => left ** right),
    '%': unchecked((left, right) => left % right),
    '/?': checked((left, right) => left / right),
  };
}
