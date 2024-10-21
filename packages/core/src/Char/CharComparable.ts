import type { Char } from '../Char.js';
import { Comparable } from '../Comparable.js';
import { compare } from './compare.js';

export const CharComparable = Comparable<Char>({
  compare,
});
