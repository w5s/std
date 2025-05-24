import type { LogLevel } from './LogLevel.js';

/**
 * Returns the string representation of a level
 *
 * @example
 * ```typescript
 * const level = LogLevel('Foo', 1);
 * LogLevel.asString(level);// 'Foo'
 * ```
 * @param self - the log level
 */
export function asString(self: LogLevel): string {
  return self.name;
}
