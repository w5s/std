import type { Ordering } from '../Ordering.js';

export function compare(left: boolean, right: boolean): Ordering {
  return left === right ? 0 : left < right ? -1 : 1;
}
