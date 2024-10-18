import { Callable } from '@w5s/core/dist/Callable.js';
import { LogLevel as LogLevelType } from './LogLevel/LogLevel.js';
import { LogLevelComparable } from './LogLevel/LogComparable.js';
import { of } from './LogLevel/of.js';
import { LogValue } from './LogLevel/LogValue.js';
import { match } from './LogLevel/match.js';

export interface LogLevel extends LogLevelType {}

/**
 * @example
 * @namespace
 */
export const LogLevel = Callable({
  [Callable.symbol]: of,
  ...LogLevelType,
  ...LogLevelComparable,
  ...LogValue,
  of,
  /**
   * Returns the string representation of a level
   *
   * @example
   * ```ts
   * const level = LogLevel('Foo', 1);
   * LogLevel.format(level);// 'Foo'
   * ```
   * @param level - the log level
   */
  format(level: LogLevel): string {
    return level.name;
  },

  /**
   * Returns the numerical representation of a level
   *
   * @example
   * ```ts
   * const level = LogLevel('Foo', 1);
   * LogLevel.value(level);// 1
   * ```
   * @param level - the log level
   */
  value(level: LogLevel): number {
    return level.value;
  },
  match,
});
