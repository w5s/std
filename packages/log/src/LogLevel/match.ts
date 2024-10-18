import type { Option } from '@w5s/core';
import type { LogLevel } from '../LogLevel.js';
import { LogLevelComparable } from './LogComparable.js';
import { LogValue } from './LogValue.js';

/**
 * Build a matching function `(anyLevelValue) => value` from a list of tuples `[level1, value1], [level2, value2], ...`
 *
 * @example
 * ```ts
 * const matcher = LogLevel.match([
 *  [LogLevel.Error, 'This is error'],
 *  [LogLevel.Warning, 'This is warning'],
 * ]);
 * matcher(LogLevel.Critical);// 'This is error'
 * matcher(LogLevel.Error);// 'This is error'
 * matcher(LogLevel.Warning);// 'This is warning'
 * matcher(LogLevel.Info);// undefined
 * ```
 * @param matchers
 */
export function match<T>(matchers: [LogLevel, T][]): (anyLevel: LogLevel) => Option<T>;
export function match<T>(matchers: [LogLevel, T][], defaultValue: T): (anyLevel: LogLevel) => T;
export function match<T>(matchers: [LogLevel, T][], defaultValue?: T): (anyLevel: LogLevel) => Option<T> {
  const orderedMatchers = [...matchers];
  const level = 0;
  const returnValue = 1;
  const first: [LogLevel, Option<T>] = [LogValue.None, defaultValue];

  return orderedMatchers.length === 0
    ? () => defaultValue
    : (anyLevel) =>
        orderedMatchers.reduce(
          (acc, matcher) =>
            LogLevelComparable.compare(matcher[level], acc[level]) > 0 && anyLevel.value >= matcher[level].value
              ? matcher
              : acc,
          first,
        )[returnValue];
}
