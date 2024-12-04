import { from } from '@w5s/task/dist/Task/from.js';
import type { LogHandler } from '../LogHandler.js';
import { LogLevel } from '../LogLevel.js';

const consoleLevel = LogLevel.match(
  [
    [LogLevel.Error, (console: Console) => console.error.bind(console)],
    [LogLevel.Warning, (console: Console) => console.warn.bind(console)],
    [LogLevel.Info, (console: Console) => console.info.bind(console)],
    // [LogLevel.Debug, (console: Console) => console.debug.bind(console)],
  ],
  (console: Console) => console.debug.bind(console),
);

/**
 *
 * @example
 * ```ts
 * ```
 * @param logRecord
 */
export function Console(): LogHandler {
  return (logRecord) =>
    from(({ resolve }) => {
      const { category, message, level, data } = logRecord;
      const prefix = category.length > 0 ? [`[${category}]`] : [];
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      const suffix = message.map((part) => (typeof part === 'string' ? part : String(data[part.$ref] ?? '')));
      consoleLevel(level)(console)(...prefix, ...suffix);
      resolve();
    });
}
