import type { Int } from '@w5s/core';
import type { LogLevel } from '../LogLevel.js';

/**
 * Construct a new `LogLevel`
 *
 * @example
 * ```typescript
 * const level = LogLevel('UberCritical', 60);// { levelName: 'UberCritical', level: 60 }
 * ```
 * @category Constructor
 * @param name - the level string representation
 * @param value - the level value
 */
export function of(name: string, levelValue: Int): LogLevel {
  return { _: 'LogLevel', name, value: levelValue };
}
