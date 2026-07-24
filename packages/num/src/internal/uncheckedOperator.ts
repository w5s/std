import type { NumberConversion } from '../NumberConversion.js';

export function uncheckedOperator<T>(BaseType: NumberConversion<T>) {
  const { asNumber, fromNumber } = BaseType;
  return (fn: (left: number, right: number) => number) =>
    (left: T, right: T): T =>
      fromNumber(fn(asNumber(left), asNumber(right)));
}
