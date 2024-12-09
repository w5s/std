/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import type { Option } from '@w5s/core';
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
   * Return true when log should be written to stderr
   *
   * @param logRecord
   */
  isStderr?: (logRecord: LogRecord) => boolean;
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
 * ```ts
 * LogHandler.Console();// Default formatter
 * LogHandler.Console({
 *   format: ({ domain }) => ([JSON.stringify(logRecord)]),// Pure JSON formatted
 * })
 * ```
 * @param options
 */
export function Console(options: ConsoleOptions = {}): LogHandler {
  const {
    isStderr = (record) => LogLevel['>='](record.level, LogLevel.Error),
    format = defaultFormat,
    console = globalThis.console,
  } = options;
  const eol = '\n';
  const stdout = (console as any)._stdout as Option<NodeJS.WriteStream>;
  const stderr = (console as any)._stderr as Option<NodeJS.WriteStream>;
  const consoleWrite =
    stderr == null || stdout == null
      ? LogLevel.match(
          [
            [LogLevel.Error, console.error.bind(console)],
            [LogLevel.Warning, console.warn.bind(console)],
            [LogLevel.Info, console.info.bind(console)],
            // [LogLevel.Debug, (console: Console) => console.debug.bind(console)],
          ],
          console.debug.bind(console),
        )
      : (_level: LogLevel, writeToStderr: boolean) =>
          (...data: any[]) => {
            (writeToStderr ? stderr : stdout).write(`${data.join(' ')}${eol}`);
          };
  return (logRecord) =>
    taskFrom(({ resolve }) => {
      consoleWrite(logRecord.level, isStderr(logRecord))(...format(logRecord));
      resolve();
    });
}
