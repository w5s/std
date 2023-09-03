import type { LogHandler } from '../handler.js';
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
  taskRun({ resolve }) {
    const prefix = logRecord.category.length > 0 ? [`[${logRecord.category}]`] : [];
    const suffix = logRecord.message.map((part) => (typeof part === 'string' ? part : part[1]));
    consoleLevel(logRecord.level)(console)(...prefix, ...suffix);
    resolve();
  },
});
