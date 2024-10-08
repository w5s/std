import type { Int, Option, Type } from '@w5s/core';
import { Comparable } from '@w5s/core/dist/Comparable.js';
import { $Object as TObject } from '@w5s/core/dist/Type/Object.js';
import { string } from '@w5s/core/dist/Type/string.js';
import { Int as TInt } from '@w5s/core/dist/Type/Int.js';
import { IntBounded } from '@w5s/core/dist/Int/IntBounded.js';
import { Callable } from '@w5s/core/dist/Callable.js';
import { constant } from '@w5s/core/dist/Type/constant.js';

const LogLevelType = TObject({
  _: constant('LogLevel'),
  /**
   * Log level name
   */
  name: string,
  /**
   * Log level value (number). Often used to filter / sort logs
   */
  value: TInt,
});

const LogLevelComparable = Comparable({
  compare(left: LogLevel, right: LogLevel): number {
    const diff = left.value - right.value;

    return diff === 0 ? diff : diff < 0 ? -1 : 1;
  },
});

export interface LogLevel extends Type.TypeOf<typeof LogLevelType> {}

function of(name: string, levelValue: Int): LogLevel {
  return { _: 'LogLevel', name, value: levelValue };
}

const None = of('None', IntBounded.minValue);

function match<T>(matchers: [LogLevel, T][]): (anyLevel: LogLevel) => Option<T>;
function match<T>(matchers: [LogLevel, T][], defaultValue: T): (anyLevel: LogLevel) => T;
function match<T>(matchers: [LogLevel, T][], defaultValue?: T): (anyLevel: LogLevel) => Option<T> {
  const orderedMatchers = [...matchers];
  const level = 0;
  const returnValue = 1;
  const first: [LogLevel, Option<T>] = [None, defaultValue];

  return orderedMatchers.length === 0
    ? () => defaultValue
    : (anyLevel) =>
        orderedMatchers.reduce(
          (acc, matcher) =>
            LogLevel.compare(matcher[level], acc[level]) > 0 && anyLevel.value >= matcher[level].value ? matcher : acc,
          first,
        )[returnValue];
}

/**
 * @example
 * @namespace
 */
export const LogLevel = Callable({
  [Callable.symbol]: of,
  ...LogLevelType,
  ...LogLevelComparable,
  /**
   * Construct a new `LogLevel`
   *
   * @example
   * ```ts
   * const level = LogLevel('UberCritical', 60);// { levelName: 'UberCritical', level: 60 }
   * ```
   * @category Constructor
   * @param name - the level string representation
   * @param value - the level value
   */
  of,

  /**
   * Critical log level (50)
   */
  Critical: of('Critical', 50 as Int),
  /**
   * Error log level (40)
   */
  Error: of('Error', 40 as Int),
  /**
   * Warning log level (30)
   */
  Warning: of('Warning', 30 as Int),
  /**
   * Info log level (20)
   */
  Info: of('Info', 20 as Int),
  /**
   * Debug log level (10)
   */
  Debug: of('Debug', 10 as Int),

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
  match,
});
