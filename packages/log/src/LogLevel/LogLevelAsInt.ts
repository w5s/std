import type { AsInt } from '@w5s/core';
import type { LogLevel } from './LogLevel.js';

/**
 * Returns the numerical representation of a level
 *
 * @example
 * ```typescript
 * const level = LogLevel('Foo', 1);
 * LogLevel.asInt(level);// 1
 * ```
 * @param self - the log level
 */
export const LogLevelAsInt: AsInt<LogLevel> = {
  asInt(self) {
    return self.value;
  },
};
