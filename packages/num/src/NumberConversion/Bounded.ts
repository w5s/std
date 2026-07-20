import type { Bounded } from '@w5s/core';
import type { NumberConversion } from '../NumberConversion.js';
import { defaultConversion } from '../internal/defaultConversion.js';

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
export function Bounded(): Bounded<number>;
export function Bounded<T>(BaseType: Pick<NumberConversion<T>, 'fromNumber'>): Bounded<T>;
export function Bounded<T>(BaseType?: Pick<NumberConversion<T>, 'fromNumber'>): Bounded<T> {
  const { fromNumber } = BaseType ?? defaultConversion<T>();
  return {
    maxValue: fromNumber(Number.MAX_VALUE),
    minValue: fromNumber(Number.MIN_VALUE),
  };
}
