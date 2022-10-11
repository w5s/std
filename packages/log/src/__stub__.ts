import { Time } from '@w5s/core';
import { UUID } from '@w5s/uuid';
import { LogRecord } from './record.js';
import { LogLevel } from './level.js';
import { LogMessage } from './message.js';

export const generateTime = (ms = 0) => Time(ms);

export const generateLogRecord = ({
  logLevel = LogLevel.Debug,
  logMessage = LogMessage(['test']),
  logCategory = '',
}: Partial<
  Pick<LogRecord, 'logMessage' | 'logCategory'> & {
    logLevel?: LogLevel;
  }
> = {}): LogRecord =>
  LogRecord({
    logId: UUID.empty(),
    logCategory,
    logLevel,
    logMessage,
    logData: {},
    logCreated: generateTime(),
  });
