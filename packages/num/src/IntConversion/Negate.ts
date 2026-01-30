import type { Numeric } from '@w5s/core';
import type { IntConversion } from '../IntConversion.js';
import { Negate as NumberNegate } from '../NumberConversion/Negate.js';
import { __defaultConversion } from './__defaultConversion.js';
import { __toNumberConversion } from './__toNumberConversion.js';
import type { Int } from '../Int.js';

export function Negate(): Numeric.Negate<Int>;
export function Negate<T>(BaseType: IntConversion<T>): Numeric.Negate<T>;
export function Negate<T>(BaseType?: IntConversion<T>): Numeric.Negate<T> {
  return NumberNegate(__toNumberConversion(BaseType ?? __defaultConversion()));
}
