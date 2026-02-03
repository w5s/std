import type { Int } from '@w5s/core';
import { LogLevel } from './LogLevel.js';

/**
 * Construct a new `LogLevel`
 *
 * @example
 * ```typescript
 * const level = LogLevel('UberCritical', 60);// LogLevel.create({ name: 'UberCritical', value: 60 })
 * ```
 * @category Constructor
 * @param name - the level string representation
 * @param levelValue - the level value
 */
export function of(name: string, levelValue: Int): LogLevel {
  return LogLevel.create({ name, value: levelValue });
}
