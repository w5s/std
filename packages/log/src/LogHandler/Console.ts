import { Console as defaultConsole } from '@w5s/console/dist/Console.js';
import type { LogHandler } from '../LogHandler.js';
import { asString as logLevelAsString } from '../LogLevel/asString.js';
import { asInt as logLevelAsInt } from '../LogLevel/asInt.js';
import { LogLevelValue } from '../LogLevel/LogLevelValue.js';
import type { LogRecord } from '../LogRecord.js';
import { messageWithData } from '../LogRecord/messageWithData.js';
import type { LogLevel } from '../LogLevel.js';

const defaultWebConsoleFormat: Exclude<ConsoleOptions['format'], undefined> = (logRecord: LogRecord) => {
  const { domain } = logRecord;

  const parts = [...(domain.length > 0 ? [`[${domain}]`] : []), ...messageWithData(logRecord)];
  return (parts.length > 0 ? parts : ['']) as [required: unknown, ...optionalParameters: unknown[]];
};
const defaultStdConsoleFormat: Exclude<ConsoleOptions['format'], undefined> = (logRecord: LogRecord) => {
  const { level, created } = logRecord;

  return [
    new Date(created).toISOString(),
    logLevelAsString(level).toUpperCase(),
    ...defaultWebConsoleFormat(logRecord),
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
   * Custom console instance (default: globalThis.console)
   */
  console?: Pick<typeof defaultConsole, 'debug' | 'info' | 'warn' | 'error' | 'isWeb'>;
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
  const format = formatOption ?? (console.isWeb() ? defaultWebConsoleFormat : defaultStdConsoleFormat);
  const consoleWrite = (level: LogLevel) => {
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (true) {
      case logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Error): {
        return console.error;
      }
      case logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Warn): {
        return console.warn;
      }
      case logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Info): {
        return console.info;
      }
      default: {
        return console.debug;
      }
    }
  };
  return (logRecord) => consoleWrite(logRecord.level)(...format(logRecord));
}
