import type { Task } from '@w5s/task/Task';
import { andThen as taskThen } from '@w5s/task/Task/andThen';
import { randomUUID } from '@w5s/uuid/randomUUID';
import { now as timeNow } from '@w5s/time/Time/now';
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
 * ```typescript
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
