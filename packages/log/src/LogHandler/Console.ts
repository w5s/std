/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { from as taskFrom } from '@w5s/task/dist/Task/from.js';
import type { Option } from '@w5s/core';
import type { LogHandler } from '../LogHandler.js';
import { asString as logLevelAsString } from '../LogLevel/asString.js';
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
    isStderr = (record) => record.level.value >= LogLevelValue.Error.value,
    format: formatOption,
    console = globalThis.console,
  } = options;
  const eol = '\n';
  const stdout = (console as any)._stdout as Option<NodeJS.WriteStream>;
  const stderr = (console as any)._stderr as Option<NodeJS.WriteStream>;
  const isWebConsole = stderr == null || stdout == null;
  const format = formatOption ?? (isWebConsole ? defaultWebConsoleFormat : defaultStdConsoleFormat);
  const consoleWrite = isWebConsole
    ? (level: LogLevel, _writeToStderr: boolean) => {
        // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
        switch (true) {
          case level.value >= LogLevelValue.Error.value: {
            return console.error.bind(console);
          }
          case level.value >= LogLevelValue.Warn.value: {
            return console.warn.bind(console);
          }
          case level.value >= LogLevelValue.Info.value: {
            return console.info.bind(console);
          }
          default: {
            return console.debug.bind(console);
          }
        }
      }
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
