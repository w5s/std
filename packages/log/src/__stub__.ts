import { Time } from '@w5s/time';
import { UUID } from '@w5s/core';
import { LogRecord } from './LogRecord.js';
import { LogLevel } from './LogLevel.js';
import { LogMessage } from './LogMessage.js';

export const generateTime = (ms = 0) => Time.of(ms);

export const generateLogRecord = ({
  level = LogLevel.Debug,
  message = LogMessage.of('test'),
  category = '',
}: Partial<
  Pick<LogRecord, 'message' | 'category'> & {
    level?: LogLevel;
  }
> = {}): LogRecord => ({
  _: 'LogRecord',
  id: UUID.empty(),
  category,
  level,
  message,
  // data: {},
  created: generateTime(),
});
