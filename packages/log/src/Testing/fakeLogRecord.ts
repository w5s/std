import { Time } from '@w5s/time';
import { UUID } from '@w5s/uuid';
import { LogRecord } from '../LogRecord.js';
import { LogLevel } from '../LogLevel.js';
import { LogMessage } from '../LogMessage.js';

export const fakeLogRecord = (properties: Partial<LogRecord> = {}): LogRecord => ({
  _: 'LogRecord',
  id: UUID.empty(),
  domain: '',
  level: LogLevel.Debug,
  message: LogMessage.of('test'),
  data: {},
  created: Time(0),
  ...properties,
});
