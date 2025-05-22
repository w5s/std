import { resolve } from '@w5s/task/dist/Task/resolve.js';
import type { Task } from '@w5s/task';
import type { LogHandler } from '../LogHandler.js';
import type { LogRecord } from '../LogRecord.js';

const resolveVoid: Task<void, never> = resolve();

/**
 * Decorate handler where `predicate` is applied on record input.
 * If `false`, the handler is never called
 *
 * @example
 * ```typescript
 * const handler: LogHandler;
 * const filtered = LogHandler.filter(handler, (record) => record.logCategory === 'foo');
 * ```
 * @param self - the handler function
 * @param predicate - the predicate applied on log record
 */
export function filter(self: LogHandler, predicate: (record: LogRecord) => boolean): LogHandler {
  return (logRecord) => (predicate(logRecord) ? self(logRecord) : resolveVoid);
}
