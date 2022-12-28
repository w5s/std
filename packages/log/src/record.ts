import type { DataObject, Time } from '@w5s/core';
import type { UUID } from '@w5s/uuid';
import { LogMessage } from './message.js';
import { LogLevel } from './level.js';

export interface LogRecord
  extends DataObject<{
    [DataObject.type]: 'LogRecord';
    /**
     * Event identifier
     */
    id: UUID;
    /**
     * The log category / logger name
     */
    category: string;
    /**
     * The log category / logger name
     */
    level: LogLevel;
    /**
     * Additional data
     */
    data: Readonly<{ [key: string]: unknown }>;
    /**
     * Unformatted message
     */
    message: LogMessage;
    /**
     * Time when the record was created
     */
    created: Time;
  }> {}

/**
 * Construct LogRecord
 *
 * @example
 * ```ts
 * const logRecord = LogRecord({
 *   id: UUID.empty(),
 *   category: 'any category',
 *   level: LogLevel.Critical,
 *   data: { foo: true },
 *   message: LogMessage('message'),
 *   created: Time(Date.now()),
 * });
 * ```
 * @param properties - constructor parameters
 */
export function LogRecord(properties: DataObject.Parameters<LogRecord>): LogRecord {
  return {
    _: 'LogRecord',
    level: properties.level,
    id: properties.id,
    category: properties.category,
    data: properties.data,
    message: properties.message,
    created: properties.created,
  };
}
