import type { Task } from '@w5s/task';
import { andThen as taskThen } from '@w5s/task/dist/Task/andThen.js';
import { randomUUID } from '@w5s/uuid/dist/randomUUID.js';
import { now as timeNow } from '@w5s/time/dist/Time/now.js';
import type { LogLevelParameters } from '../level.js';
import type { LogRecord } from '../LogRecord.js';
import { handle } from './handle.js';

export interface LogSendFunction {
  /**
   * Returns a new logging task
   */
  (parameters: LogLevelParameters): Task<void, never>;
  /**
   * The log domain added to all records
   */
  logDomain: LogRecord['domain'];
}

/**
 * Returns a new log sender function
 *
 * @example
 * ```ts
 * Log.sendWith('example')(warn`My message`); // Task<void, never>
 * ```
 * @param domain
 */
export function sendWith(domain: LogRecord['domain']): LogSendFunction {
  return Object.assign(
    (parameters: LogLevelParameters) =>
      taskThen(randomUUID(), (uuid) =>
        taskThen(timeNow(), (now) => {
          const initialRecord: LogRecord = {
            _: 'LogRecord',
            id: uuid,
            domain,
            created: now,
            ...parameters,
          };
          return handle(initialRecord);
        }),
      ),
    {
      logDomain: domain,
    },
  );
}
