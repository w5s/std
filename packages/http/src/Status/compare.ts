import { compare as compareNumber } from '@w5s/num/dist/Number/compare.js';
import type { Ordering } from '@w5s/core';
import type { Status } from './Status.js';

export function compare(left: Status, right: Status): Ordering {
  return compareNumber(left.statusCode, right.statusCode);
}
