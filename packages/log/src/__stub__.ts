import { Time } from '@w5s/time';
import { UUID } from '@w5s/random';
import { LogRecord } from './record.js';
import { LogLevel } from './level.js';
import { LogMessage } from './message.js';

export const generateTime = (ms = 0) => Time.of(ms);

export const generateLogRecord = ({
  level = LogLevel.Debug,
  message = LogMessage.of('test'),
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
