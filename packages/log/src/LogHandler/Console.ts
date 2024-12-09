import { from } from '@w5s/task/dist/Task/from.js';
import type { LogHandler } from '../LogHandler.js';
import { LogLevel } from '../LogLevel.js';
import type { LogRecord } from '../LogRecord.js';
import { messageWithData } from '../LogRecord/messageWithData.js';

const defaultFormat = (logRecord: LogRecord) => {
  const { domain } = logRecord;

  return [...(domain.length > 0 ? [`[${domain}]`] : []), ...messageWithData(logRecord)];
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
  console?: Console;
}

/**
 *
 * @example
 * ```ts
 * LogHandler.Console();// Default formatter
 * LogHandler.Console({
 *   format: ({ domain }) => ([JSON.stringify(logRecord)]),// Pure JSON formatted
 * })
 * ```
 * @param options
 */
export function Console(options: ConsoleOptions = {}): LogHandler {
  const { format = defaultFormat, console = globalThis.console } = options;

  const consoleWrite = LogLevel.match(
    [
      [LogLevel.Error, console.error.bind(console)],
      [LogLevel.Warning, console.warn.bind(console)],
      [LogLevel.Info, console.info.bind(console)],
      // [LogLevel.Debug, (console: Console) => console.debug.bind(console)],
    ],
    console.debug.bind(console),
  );
  return (logRecord) =>
    from(({ resolve }) => {
      consoleWrite(logRecord.level)(...format(logRecord));
      resolve();
    });
}
