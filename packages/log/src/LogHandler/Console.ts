import { Console as defaultConsole } from '@w5s/console/dist/Console.js';
import { fontWeight as ansiFontWeight } from '@w5s/console/dist/ANSICode/fontWeight.js';
import { color as ansiColor } from '@w5s/console/dist/ANSICode/color.js';
import { format as timeAsString } from '@w5s/time/dist/Time/format.js';
import type { LogHandler } from '../LogHandler.js';
import { LogLevelAsString } from '../LogLevel/LogLevelAsString.js';
import { asInt as logLevelAsInt } from '../LogLevel/asInt.js';
import { LogLevelValue } from '../LogLevel/LogLevelValue.js';
import type { LogRecord } from '../LogRecord.js';
import { messageWithData } from '../LogRecord/messageWithData.js';
import type { LogLevel } from '../LogLevel.js';

const red = ansiColor('red');
const yellow = ansiColor('yellow');
const blue = ansiColor('blue');
const black = ansiColor('black');
const dim = ansiFontWeight('dim');
const formatTime = dim;

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
  const { domain, level, created } = logRecord;

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
   * Returns an array of arguments passed to the console.{log|warn|...}() function
   *
   * @param logRecord
   */
  format: (logRecord: LogRecord, options: ConsoleOptions) => [required: unknown, ...optionalParameters: unknown[]];
  /**
   * Custom console instance (default: Console)
   */
  console: Pick<typeof defaultConsole, 'debug' | 'info' | 'warn' | 'error'>;
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
    format: defaultFormat,
    console: defaultConsole,
    ...options,
  };
  const { format, console } = resolvedOptions;
  const consoleWrite = (level: LogLevel, args: [required: unknown, ...optionalParameters: unknown[]]) =>
    logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Error)
      ? console.error(...args)
      : logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Warn)
        ? console.warn(...args)
        : logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Info)
          ? console.info(...args)
          : console.debug(...args);
  return (logRecord) => consoleWrite(logRecord.level, format(logRecord, resolvedOptions));
}
