import { Comparable } from '@w5s/core/dist/Comparable.js';
import { compare } from './compare.js';

export const NumberComparable = Comparable<number>({
  compare,
});
