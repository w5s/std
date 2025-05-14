import type { Ordering } from '@w5s/core';
import { compare as compareNumber } from '@w5s/core/dist/Number/compare.js';
import type { LogLevel } from '../LogLevel.js';

export function compare(left: LogLevel, right: LogLevel): Ordering {
  return compareNumber(left.value, right.value);
}
