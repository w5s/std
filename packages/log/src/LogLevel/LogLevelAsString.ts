import type { AsString } from '@w5s/core';
import type { LogLevel } from './LogLevel.js';

export const LogLevelAsString: AsString<LogLevel> = {
  /**
   * Returns the string representation of a level
   *
   * @example
   * ```typescript
   * const level = LogLevel('Foo', 1);
   * LogLevel.asString(level);// 'Foo'
   * ```
   * @category Formatting
   * @param self - the log level
   */
  asString(self: LogLevel): string {
    return self.name;
  },
};
