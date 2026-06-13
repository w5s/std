import { Comparable } from '@w5s/core/Comparable';
import { compare } from './compare.js';

export const BigIntComparable = Comparable<bigint>({
  compare,
});
