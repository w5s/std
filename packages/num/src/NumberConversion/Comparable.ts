import { Comparable as CoreComparable } from '@w5s/core/dist/Comparable.js';

import type { NumberConversion } from '../NumberConversion.js';

import { defaultConversion } from '../internal/defaultConversion.js';
import { compare } from '../Number/compare.js';

export function Comparable(): CoreComparable<number>;
export function Comparable<T = number>(BaseType: Pick<NumberConversion<T>, 'asNumber'>): CoreComparable<T>;
export function Comparable<T>(BaseType?: Pick<NumberConversion<T>, 'asNumber'>): CoreComparable<T> {
  const { asNumber } = BaseType ?? defaultConversion<T>();
  return CoreComparable<T>({
    compare(left, right) {
      return compare(asNumber(left), asNumber(right));
    },
  });
}
