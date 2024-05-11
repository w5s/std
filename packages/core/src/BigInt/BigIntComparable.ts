import { Comparable } from '../Comparable.js';
import { compare } from './compare.js';

export const BigIntComparable = Comparable<bigint>({
  compare,
});
