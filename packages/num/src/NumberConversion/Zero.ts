import type { Numeric } from '@w5s/core';

import type { NumberConversion } from '../NumberConversion.js';

import { defaultConversion } from '../internal/defaultConversion.js';

export function Zero(): Numeric.Zero<number>;
export function Zero<T>(BaseType: NumberConversion<T>): Numeric.Zero<T>;
export function Zero<T>(BaseType?: NumberConversion<T>): Numeric.Zero<T> {
  const { asNumber, fromNumber } = BaseType ?? defaultConversion();
  return {
    isZero: (self: T) => asNumber(self) === 0,
    zero: () => fromNumber(0),
  };
}
