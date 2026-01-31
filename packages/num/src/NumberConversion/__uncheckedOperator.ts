import type { NumberConversion } from '../NumberConversion.js';

export function __uncheckedOperator<T>(BaseType: NumberConversion<T>) {
  const { fromNumber, asNumber } = BaseType;
  return (fn: (left: number, right: number) => number) =>
    (left: T, right: T): T =>
      fromNumber(fn(asNumber(left), asNumber(right)));
}
