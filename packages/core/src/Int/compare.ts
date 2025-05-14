import type { Int } from '../Int.js';
import type { Ordering } from '../Ordering.js';

export function compare(left: Int, right: Int): Ordering {
  return left === right ? 0 : left < right ? -1 : 1;
}
