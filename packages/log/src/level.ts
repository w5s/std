import type { DataObject, Option } from '@w5s/core';

export interface LogLevel
  extends DataObject<{
    [DataObject.type]: 'LogLevel';
    /**
     * The log level string representation
     */
    name: string;
    /**
     * The log level numeric value
     */
    value: number;
  }> {}

function of(name: string, levelValue: number): LogLevel {
  return { _: 'LogLevel', name, value: levelValue };
}

const None = of('None', Number.NEGATIVE_INFINITY);

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
          first
        )[returnValue];
}

/**
 * @example
 * @namespace
 */
export const LogLevel = {
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
  Critical: of('Critical', 50),
  /**
   * Error log level (40)
   */
  Error: of('Error', 40),
  /**
   * Warning log level (30)
   */
  Warning: of('Warning', 30),
  /**
   * Info log level (20)
   */
  Info: of('Info', 20),
  /**
   * Debug log level (10)
   */
  Debug: of('Debug', 10),

  /**
   * Return the comparison result
   *
   * @example
   * ```ts
   * const levels = [LogLevel('Lvl2', 2), LogLevel('Lvl1', 1), LogLevel('Lvl3', 3)];
   * levels.sort(Level.compare);// [LogLevel('Lvl1', 1), LogLevel('Lvl2', 2), LogLevel('Lvl3', 3)]
   * ```
   * @param left - the left element
   * @param right - the right element
   */
  compare(left: LogLevel, right: LogLevel): number {
    const diff = left.value - right.value;

    return diff === 0 ? diff : diff < 0 ? -1 : 1;
  },

  /**
   * Returns the string representation of a level
   *
   * @example
   * ```ts
   * const level = LogLevel('Foo', 1);
   * LogLevel.stringify(level);// 'Foo'
   * ```
   * @param level - the log level
   */
  stringify(level: LogLevel): string {
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
};
