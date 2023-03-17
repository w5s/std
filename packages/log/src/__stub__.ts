import { Time } from '@w5s/core';
import { UUID } from '@w5s/random';
import { LogRecord } from './record.js';
import { LogLevel } from './level.js';
import { LogMessage } from './message.js';

export const generateTime = (ms = 0) => Time(ms);

export const generateLogRecord = ({
  level = LogLevel.Debug,
  message = LogMessage(['test']),
  category = '',
}: Partial<
  Pick<LogRecord, 'message' | 'category'> & {
    level?: LogLevel;
  }
> = {}): LogRecord =>
  LogRecord({
    id: UUID.empty(),
    category,
    level,
    message,
    data: {},
    created: generateTime(),
  });
