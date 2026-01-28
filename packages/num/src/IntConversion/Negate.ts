import type { Numeric } from '@w5s/core';
import type { IntConversion } from '../IntConversion.js';
import { __defaultConversion } from './__defaultConversion.js';

export function Negate<T>(IntLikeType?: IntConversion<T>): Numeric.Negate<T> {
  const { fromInt, asInt } = IntLikeType ?? (__defaultConversion as IntConversion<T>);
  return {
    negate(self) {
      // @ts-ignore we know asInt(self) is Int
      // eslint-disable-next-line @typescript-eslint/no-unsafe-unary-minus
      return fromInt(-asInt(self));
    },
  };
}
