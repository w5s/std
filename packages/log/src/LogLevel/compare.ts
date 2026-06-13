import type { Ordering } from '@w5s/core/Ordering';
import { compare as compareNumber } from '@w5s/num/Number/compare';
import type { LogLevel } from '../LogLevel.js';

export function compare(left: LogLevel, right: LogLevel): Ordering {
  return compareNumber(left.value, right.value);
}
