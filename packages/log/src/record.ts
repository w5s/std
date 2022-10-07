import type { Time } from '@w5s/core';
import type { UUID } from '@w5s/uuid';
import { LogMessage } from './message.js';
import { LogLevel } from './level.js';

export interface LogRecord {
  /**
   * Event identifier
   */
  readonly logId: UUID;
  /**
   * The log category / logger name
   */
  readonly logCategory: string;
  /**
   * The log category / logger name
   */
  readonly logLevel: LogLevel;
  /**
   * Additional data
   */
  readonly logData: Readonly<{ [key: string]: unknown }>;
  /**
   * Unformatted message
   */
  readonly logMessage: LogMessage;
  /**
   * Time when the record was created
   */
  readonly logCreated: Time;
}

/**
 * Construct LogRecord
 *
 * @example
 * ```ts
 * const logRecord = LogRecord({
 *   logId: UUID.empty(),
 *   logCategory: 'any category',
 *   logLevel: LogLevel.Critical,
 *   logData: { foo: true },
 *   logMessage: LogMessage('message'),
 *   logCreated: Time(Date.now()),
 * });
 * ```
 * @param properties - constructor parameters
 */
export function LogRecord(properties: {
  logId: LogRecord['logId'];
  logCategory: LogRecord['logCategory'];
  logLevel: LogRecord['logLevel'];
  logData: LogRecord['logData'];
  logMessage: LogRecord['logMessage'];
  logCreated: LogRecord['logCreated'];
}): LogRecord {
  return {
    logLevel: properties.logLevel,
    logId: properties.logId,
    logCategory: properties.logCategory,
    logData: properties.logData,
    logMessage: properties.logMessage,
    logCreated: properties.logCreated,
  };
}
