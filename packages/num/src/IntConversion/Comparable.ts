import { Comparable as ComparableModule } from '@w5s/core/dist/Comparable.js';
import type { Int } from '../Int.js';
import { compare } from '../Int/compare.js';
import type { IntConversion } from '../IntConversion.js';
import { __defaultConversion } from './__defaultConversion.js';

export function Comparable<T = Int>(IntLikeType?: Pick<IntConversion<T>, 'asInt'>): ComparableModule<T> {
  const { asInt } = IntLikeType ?? __defaultConversion();
  return ComparableModule<T>({
    compare(left, right) {
      return compare(asInt(left), asInt(right));
    },
  });
}
