import type { DataObject } from '@w5s/core';
import type { Time } from '@w5s/time';
import type { UUID } from '@w5s/random';
import type { LogMessage } from './message.js';
import type { LogLevel } from './level.js';

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
 *   message: LogMessage.of('message'),
 *   created: Time.of(Date.now()),
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
