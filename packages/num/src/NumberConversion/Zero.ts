import type { Numeric } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { __defaultConversion } from './__defaultConversion.js';

export function Zero(): Numeric.Zero<number>;
export function Zero<T>(BaseType: NumberConversion<T>): Numeric.Zero<T>;
export function Zero<T>(BaseType?: NumberConversion<T>): Numeric.Zero<T> {
  const { fromNumber, asNumber } = BaseType ?? __defaultConversion();
  return {
    zero: () => fromNumber(0),
    isZero: (self: T) => asNumber(self) === 0,
  };
}
