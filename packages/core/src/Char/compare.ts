import type { Char } from '../Char.js';
import type { Ordering } from '../Ordering.js';

export function compare(left: Char, right: Char): Ordering {
  return left === right ? 0 : left < right ? -1 : 1;
}
