import type { Int } from '../Int.js';

export function compare(left: Int, right: Int): number {
  return left === right ? 0 : left < right ? -1 : 1;
}
