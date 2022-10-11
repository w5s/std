/* eslint-disable @typescript-eslint/no-explicit-any,no-console */
import { LogHandler } from '../handler.js';
import { LogLevel } from '../level.js';

const consoleLevel = LogLevel.match(
  [
    [LogLevel.Error, (console: Console) => console.error.bind(console)],
    [LogLevel.Warning, (console: Console) => console.warn.bind(console)],
    [LogLevel.Info, (console: Console) => console.info.bind(console)],
    // [LogLevel.Debug, (console: Console) => console.debug.bind(console)],
  ],
  (console: Console) => console.debug.bind(console)
);

/**
 *
 * @example
 * ```ts
 * ```
 * @param logRecord
 */
export const ConsoleHandler: LogHandler = (logRecord) => ({
  taskRun(resolve) {
    const prefix = logRecord.logCategory.length > 0 ? [`[${logRecord.logCategory}]`] : [];
    const suffix = logRecord.logMessage.map((part) => (typeof part === 'string' ? part : part.logRefValue));
    consoleLevel(logRecord.logLevel)(console)(...prefix, ...suffix);
    resolve();
  },
});
