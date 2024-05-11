import { Comparable } from '../Comparable.js';
import { compare } from './compare.js';

export const StringComparable = Comparable<string>({
  compare,
});
