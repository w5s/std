import { compare as compareNumber } from '@w5s/core/dist/Number/compare.js';
import type { Status } from './Status.js';

export function compare(left: Status, right: Status): number {
  return compareNumber(left.statusCode, right.statusCode);
}
