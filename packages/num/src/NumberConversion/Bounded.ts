import type { Bounded } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { __defaultConversion } from './__defaultConversion.js';

/**
 * Creates a Bounded instance for a type T that can be converted to and from Int.
 *
 * @example
 * ````
 * interface MyType {
 *   custom: boolean;
 *   value: number;
 * }
 * const MyTypeConversion: NumberConversion<MyType> = {
 *   fromInt: (v) => ({ custom: true, value: v }),
 *   asInt: (v) => v.value as Int,
 * }
 * const MyTypeBounded = NumberConversion.Bounded<MyType>(MyTypeConversion);
 * @param BaseType
 */
export function Bounded<T = number>(BaseType?: Pick<NumberConversion<T>, 'fromNumber'>): Bounded<T> {
  const { fromNumber } = BaseType ?? __defaultConversion<T>();
  return {
    maxValue: fromNumber(globalThis.Number.MAX_VALUE),
    minValue: fromNumber(globalThis.Number.MIN_VALUE),
  };
}
