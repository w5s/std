import type { LogLevel } from './LogLevel.js';

/**
 * Returns the string representation of a level
 *
 * @example
 * ```ts
 * const level = LogLevel('Foo', 1);
 * LogLevel.asString(level);// 'Foo'
 * ```
 * @param level - the log level
 */
export function asString(level: LogLevel): string {
  return level.name;
}
