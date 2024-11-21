import { Time } from '@w5s/time';
import { UUID } from '@w5s/core';
import { LogRecord } from '../LogRecord.js';
import { LogLevel } from '../LogLevel.js';
import { LogMessage } from '../LogMessage.js';

export const fakeLogRecord = (properties: Partial<LogRecord> = {}): LogRecord => ({
  _: 'LogRecord',
  id: UUID.empty(),
  category: '',
  level: LogLevel.Debug,
  message: LogMessage.of('test'),
  data: {},
  created: Time(0),
  ...properties,
});
