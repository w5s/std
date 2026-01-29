import type { Numeric } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { __defaultConversion } from './__defaultConversion.js';

export function Zero<T = number>(BaseType?: NumberConversion<T>): Numeric.Zero<T> {
  const { fromNumber, asNumber } = BaseType ?? __defaultConversion();
  return {
    zero: () => fromNumber(0),
    isZero: (self: T) => asNumber(self) === 0,
  };
}
