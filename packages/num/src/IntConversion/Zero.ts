import type { Numeric } from '@w5s/core';
import type { Int } from '../Int.js';
import { __defaultConversion } from './__defaultConversion.js';
import { __toNumberConversion } from './__toNumberConversion.js';
import { Zero as NumberZero } from '../NumberConversion/Zero.js';
import type { IntConversion } from '../IntConversion.js';

export function Zero(): Numeric.Zero<Int>;
export function Zero<T>(BaseType: IntConversion<T>): Numeric.Zero<T>;
export function Zero<T>(BaseType?: IntConversion<T>): Numeric.Zero<T> {
  return NumberZero(__toNumberConversion(BaseType ?? __defaultConversion()));
}
