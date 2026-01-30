import type { Comparable as ComparableModule } from '@w5s/core';
import { Comparable as NumberComparable } from '../NumberConversion/Comparable.js';
import type { Int } from '../Int.js';
import type { IntConversion } from '../IntConversion.js';
import { __defaultConversion } from './__defaultConversion.js';
import { __toNumberConversion } from './__toNumberConversion.js';

export function Comparable(): ComparableModule<Int>;
export function Comparable<T>(BaseType: IntConversion<T>): ComparableModule<T>;
export function Comparable<T>(BaseType?: IntConversion<T>): ComparableModule<T> {
  return NumberComparable(__toNumberConversion(BaseType ?? __defaultConversion()));
}
