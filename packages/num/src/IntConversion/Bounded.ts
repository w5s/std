import type { Bounded } from '@w5s/core';
import type { Int } from '../Int.js';
import type { IntConversion } from '../IntConversion.js';
import { __defaultConversion } from './__defaultConversion.js';

/**
 * Creates a Bounded instance for a type T that can be converted to and from Int.
 *
 * @example
 * ````
 * interface MyIntLike {
 *   custom: boolean;
 *   value: number;
 * }
 * const MyIntLikeConversion: IntConversion<MyIntLike> = {
 *   fromInt: (v) => ({ custom: true, value: v }),
 *   asInt: (v) => v.value as Int,
 * }
 * const MyIntLikeBounded = IntConversion.Bounded<MyIntLike>(MyIntLikeConversion);
 * @param IntLikeType
 */
export function Bounded<T = Int>(IntLikeType?: Pick<IntConversion<T>, 'fromInt'>): Bounded<T> {
  const { fromInt } = IntLikeType ?? __defaultConversion();
  return {
    maxValue: fromInt(Number.MAX_SAFE_INTEGER as Int),
    minValue: fromInt(Number.MIN_SAFE_INTEGER as Int),
  };
}
