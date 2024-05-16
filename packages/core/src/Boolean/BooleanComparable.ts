import { Comparable } from '../Comparable.js';
import { compare } from './compare.js';

export const BooleanComparable = Comparable<boolean>({
  compare,
});
