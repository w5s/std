import type { Ordering } from '@w5s/core';

export function compare(left: number, right: number): Ordering {
  return left === right ? 0 : left < right ? -1 : 1;
}
