import { Comparable as ComparableModule } from '@w5s/core/dist/Comparable.js';
import { compare } from '../Number/compare.js';
import type { NumberConversion } from '../NumberConversion.js';
import { __defaultConversion } from './__defaultConversion.js';

export function Comparable<T = number>(BaseType?: Pick<NumberConversion<T>, 'asNumber'>): ComparableModule<T> {
  const { asNumber } = BaseType ?? __defaultConversion<T>();
  return ComparableModule<T>({
    compare(left, right) {
      return compare(asNumber(left), asNumber(right));
    },
  });
}
