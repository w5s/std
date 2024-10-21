import type { Char } from '../Char.js';

export function compare(left: Char, right: Char): number {
  return left === right ? 0 : left < right ? -1 : 1;
}
