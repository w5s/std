import type * as Core from '@w5s/core';
import { Comparable as NumberComparable } from '../NumberConversion/Comparable.js';
import type { Int } from '../Int.js';
import type { IntConversion } from '../IntConversion.js';
import { __defaultConversion } from './__defaultConversion.js';
import { __toNumberConversion } from './__toNumberConversion.js';

export function Comparable(): Core.Comparable<Int>;
export function Comparable<T>(BaseType: IntConversion<T>): Core.Comparable<T>;
export function Comparable<T>(BaseType?: IntConversion<T>): Core.Comparable<T> {
  return NumberComparable(__toNumberConversion(BaseType ?? __defaultConversion()));
}
