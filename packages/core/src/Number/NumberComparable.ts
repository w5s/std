import { Comparable } from '../Comparable.js';
import { compare } from './compare.js';

export const NumberComparable = Comparable<number>({
  compare,
});
