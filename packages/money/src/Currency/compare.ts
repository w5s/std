import type { Currency } from './Currency.js';

export function compare(left: Currency, right: Currency): number {
  return left.code === right.code ? 0 : left.code < right.code ? -1 : 1;
}
