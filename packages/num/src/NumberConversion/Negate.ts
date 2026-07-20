import type { Numeric } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { defaultConversion } from '../internal/defaultConversion.js';

export function Negate(): Numeric.Negate<number>;
export function Negate<T>(BaseType: NumberConversion<T>): Numeric.Negate<T>;
export function Negate<T>(BaseType?: NumberConversion<T>): Numeric.Negate<T> {
  const { fromNumber, asNumber } = BaseType ?? defaultConversion<T>();
  return {
    negate(self) {
      // @ts-ignore we know asNumber(self) is number

      return fromNumber(-asNumber(self));
    },
  };
}
