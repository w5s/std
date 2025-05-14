import type { Ordering } from '../Ordering.js';

export function compare(left: number, right: number): Ordering {
  return left === right ? 0 : left < right ? -1 : 1;
}
