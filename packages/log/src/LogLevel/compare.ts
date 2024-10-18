import type { LogLevel } from '../LogLevel.js';

export function compare(left: LogLevel, right: LogLevel): number {
  const diff = left.value - right.value;

  return diff === 0 ? diff : diff < 0 ? -1 : 1;
}
