import { ANSICode, Console as defaultConsole } from '@w5s/console';
import { format as timeAsString } from '@w5s/time/dist/Time/format.js';

import type { LogHandler } from '../LogHandler.js';
import type { LogLevel } from '../LogLevel.js';
import type { LogRecord } from '../LogRecord.js';

import { LogLevelAsInt } from '../LogLevel/LogLevelAsInt.js';
import { LogLevelAsString } from '../LogLevel/LogLevelAsString.js';
import { LogLevelValue } from '../LogLevel/LogLevelValue.js';
import { messageWithData } from '../LogRecord/messageWithData.js';

const red = ANSICode.color('red');
const yellow = ANSICode.color('yellow');
const blue = ANSICode.color('blue');
const black = ANSICode.color('black');
const dim = ANSICode.fontWeight('dim');
const formatTime = dim;
const logLevelAsInt = LogLevelAsInt.asInt;

const formatLevelFor = (level: LogLevel) =>
  logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Error)
    ? red
    : logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Warn)
      ? yellow
      : logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Warn)
        ? blue
        : black;

const formatNoColor = (_: string): string => _;

const defaultFormat: Exclude<ConsoleOptions['format'], undefined> = (logRecord, { colors }) => {
  const { created, domain, level } = logRecord;

  return [
    (colors ? formatTime : formatNoColor)(timeAsString(created)),
    (colors ? formatLevelFor(level) : formatNoColor)(LogLevelAsString.asString(level).toUpperCase()),
    ...(domain.length > 0 ? [`[${domain}]`] : []),
    ...messageWithData(logRecord),
  ];
};

export interface ConsoleOptions {
  /**
   * Enable colors in the console output (default: true)
   */
  colors: boolean;

  /**
   * Custom console instance (default: Console)
   */
  console: Pick<typeof defaultConsole, 'debug' | 'error' | 'info' | 'warn'>;

  /**
   * Returns an array of arguments passed to the console.{log|warn|...}() function
   *
   * @param logRecord
   */
  format: (logRecord: LogRecord, options: ConsoleOptions) => [required: unknown, ...optionalParameters: Array<unknown>];
}

/**
 *
 * @example
 * ```typescript
 * LogHandler.Console();// Default formatter
 * LogHandler.Console({
 *   format: (logRecord) => ([JSON.stringify(logRecord)]),// JSON formatted line
 * })
 * ```
 * @param options
 */
export function Console(options: Partial<ConsoleOptions> = {}): LogHandler {
  const resolvedOptions = {
    colors: true,
    console: defaultConsole,
    format: defaultFormat,
    ...options,
  };
  const { console, format } = resolvedOptions;
  const consoleWrite = (level: LogLevel, args: [required: unknown, ...optionalParameters: Array<unknown>]) =>
    logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Error)
      ? console.error(...args)
      : logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Warn)
        ? console.warn(...args)
        : logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Info)
          ? console.info(...args)
          : console.debug(...args);
  return (logRecord) => consoleWrite(logRecord.level, format(logRecord, resolvedOptions));
}
