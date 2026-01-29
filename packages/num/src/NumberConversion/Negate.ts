import type { Numeric } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { __defaultConversion } from './__defaultConversion.js';

export function Negate<T = number>(BaseType?: NumberConversion<T>): Numeric.Negate<T> {
  const { fromNumber, asNumber } = BaseType ?? __defaultConversion<T>();
  return {
    negate(self) {
      // @ts-ignore we know asNumber(self) is number

      return fromNumber(-asNumber(self));
    },
  };
}
