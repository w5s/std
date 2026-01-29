import type { Numeric } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { __defaultConversion } from './__defaultConversion.js';

export function Signed(): Numeric.Signed<number>;
export function Signed<T>(BaseType: NumberConversion<T>): Numeric.Signed<T>;
export function Signed<T>(BaseType?: NumberConversion<T>): Numeric.Signed<T> {
  const { fromNumber, asNumber } = BaseType ?? __defaultConversion();
  return {
    abs: (self) => fromNumber(Math.abs(asNumber(self))),
    sign: (self) => fromNumber(Math.sign(asNumber(self))),
    isNegative: (self) => asNumber(self) < 0,
    isPositive: (self) => asNumber(self) > 0,
  };
}
