import { Console as defaultConsole } from '@w5s/console/dist/Console.js';
import { format as timeAsString } from '@w5s/time/dist/Time/format.js';
import type { LogHandler } from '../LogHandler.js';
import { asString as logLevelAsString } from '../LogLevel/asString.js';
import { asInt as logLevelAsInt } from '../LogLevel/asInt.js';
import { LogLevelValue } from '../LogLevel/LogLevelValue.js';
import type { LogRecord } from '../LogRecord.js';
import { messageWithData } from '../LogRecord/messageWithData.js';
import type { LogLevel } from '../LogLevel.js';

const defaultFormat: Exclude<ConsoleOptions['format'], undefined> = (logRecord: LogRecord) => {
  const { domain, level, created } = logRecord;

  return [
    timeAsString(created),
    logLevelAsString(level).toUpperCase(),
    ...(domain.length > 0 ? [`[${domain}]`] : []),
    ...messageWithData(logRecord),
  ];
};

export interface ConsoleOptions {
  /**
   * Returns an array of arguments passed to the console.{log|warn|...}() function
   *
   * @param logRecord
   */
  format?: (logRecord: LogRecord) => [required: unknown, ...optionalParameters: unknown[]];
  /**
   * Custom console instance (default: Console)
   */
  console?: Pick<typeof defaultConsole, 'debug' | 'info' | 'warn' | 'error'>;
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
export function Console(options: ConsoleOptions = {}): LogHandler {
  const { format: formatOption, console = defaultConsole } = options;
  const format = formatOption ?? defaultFormat;
  const consoleWrite = (level: LogLevel, args: [required: unknown, ...optionalParameters: unknown[]]) =>
    logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Error)
      ? console.error(...args)
      : logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Warn)
        ? console.warn(...args)
        : logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Info)
          ? console.info(...args)
          : console.debug(...args);
  return (logRecord) => consoleWrite(logRecord.level, format(logRecord));
}
