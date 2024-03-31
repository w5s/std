import type { Task } from '@w5s/core';
import type { LogRecord } from './LogRecord.js';

const resolveVoid: Task<void, never> = { taskRun: ({ resolve }) => resolve() };

export interface LogHandler {
  (logRecord: LogRecord): Task<void, never>;
}
/**
 * @namespace
 */
export const LogHandler = {
  /**
   * Decorate handler where `predicate` is applied on record input.
   * If `false`, the handler is never called
   *
   * @example
   * ```ts
   * const handler: LogHandler;
   * const filtered = LogHandler.filter(handler, (record) => record.logCategory === 'foo');
   * ```
   * @param handler - the handler function
   * @param predicate - the predicate applied on log record
   */
  filter(handler: LogHandler, predicate: (record: LogRecord) => boolean): LogHandler {
    return (logRecord) => (predicate(logRecord) ? handler(logRecord) : resolveVoid);
  },
};
