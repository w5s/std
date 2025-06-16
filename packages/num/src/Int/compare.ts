import type { Ordering } from '@w5s/core';
import type { Int } from '../Int.js';

export function compare(left: Int, right: Int): Ordering {
  return left === right ? 0 : left < right ? -1 : 1;
}
