import type { Ordering } from '../Ordering.js';

export function compare(left: bigint, right: bigint): Ordering {
  return left === right ? 0 : left < right ? -1 : 1;
}
