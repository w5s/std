import type { Int } from '@w5s/core';
import type { LogLevel } from './LogLevel.js';

/**
 * Returns the numerical representation of a level
 *
 * @example
 * ```typescript
 * const level = LogLevel('Foo', 1);
 * LogLevel.asInt(level);// 1
 * ```
 * @param level - the log level
 */
export function asInt(level: LogLevel): Int {
  return level.value;
}
