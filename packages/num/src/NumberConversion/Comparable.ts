import { Comparable as CoreComparable } from '@w5s/core/dist/Comparable.js';
import { compare } from '../Number/compare.js';
import type { NumberConversion } from '../NumberConversion.js';
import { __defaultConversion } from './__defaultConversion.js';

export function Comparable(): CoreComparable<number>;
export function Comparable<T = number>(BaseType: Pick<NumberConversion<T>, 'asNumber'>): CoreComparable<T>;
export function Comparable<T>(BaseType?: Pick<NumberConversion<T>, 'asNumber'>): CoreComparable<T> {
  const { asNumber } = BaseType ?? __defaultConversion<T>();
  return CoreComparable<T>({
    compare(left, right) {
      return compare(asNumber(left), asNumber(right));
    },
  });
}
