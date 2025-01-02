/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import type { Option } from '@w5s/core';
import type { LogHandler } from '../LogHandler.js';
import { asString as logLevelAsString } from '../LogLevel/asString.js';
import { asInt as logLevelAsInt } from '../LogLevel/asInt.js';
import { LogLevelValue } from '../LogLevel/LogLevelValue.js';
import type { LogRecord } from '../LogRecord.js';
import { messageWithData } from '../LogRecord/messageWithData.js';
import type { LogLevel } from '../LogLevel.js';

const defaultWebConsoleFormat = (logRecord: LogRecord) => {
  const { domain } = logRecord;

  return [...(domain.length > 0 ? [`[${domain}]`] : []), ...messageWithData(logRecord)];
};
const defaultStdConsoleFormat = (logRecord: LogRecord) => {
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
  format?: (logRecord: LogRecord) => Array<unknown>;
  /**
   * Custom console instance (default: globalThis.console)
   */
  console?: Pick<Console, 'debug' | 'info' | 'warn' | 'error'>;
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
  const { format: formatOption, console = globalThis.console } = options;
  const stdout = (console as any)._stdout as Option<NodeJS.WriteStream>;
  const stderr = (console as any)._stderr as Option<NodeJS.WriteStream>;
  const isWebConsole = stderr == null || stdout == null;
  const format = formatOption ?? (isWebConsole ? defaultWebConsoleFormat : defaultStdConsoleFormat);
  const consoleWrite = (level: LogLevel) => {
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (true) {
      case logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Error): {
        return console.error.bind(console);
      }
      case logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Warn): {
        return console.warn.bind(console);
      }
      case logLevelAsInt(level) >= logLevelAsInt(LogLevelValue.Info): {
        return console.info.bind(console);
      }
      default: {
        return console.debug.bind(console);
      }
    }
  };
  return (logRecord) => taskFrom(({ resolve }) => resolve(consoleWrite(logRecord.level)(...format(logRecord))));
}
