import type { Numeric } from '@w5s/core';

import type { NumberConversion } from '../NumberConversion.js';

import { defaultConversion } from '../internal/defaultConversion.js';

export function Signed(): Numeric.Signed<number>;
export function Signed<T>(BaseType: NumberConversion<T>): Numeric.Signed<T>;
export function Signed<T>(BaseType?: NumberConversion<T>): Numeric.Signed<T> {
  const { asNumber, fromNumber } = BaseType ?? defaultConversion();
  return {
    abs: (self) => fromNumber(Math.abs(asNumber(self))),
    isNegative: (self) => asNumber(self) < 0,
    isPositive: (self) => asNumber(self) > 0,
    sign: (self) => fromNumber(Math.sign(asNumber(self))),
  };
}
