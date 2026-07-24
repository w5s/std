import { Time } from '@w5s/time';
import { UUID } from '@w5s/uuid';

import { LogLevel } from '../LogLevel.js';
import { LogMessage } from '../LogMessage.js';
import { LogRecord } from '../LogRecord.js';

export const fakeLogRecord = (properties: Partial<LogRecord> = {}): LogRecord => ({
  _: 'LogRecord',
  created: Time(0),
  data: {},
  domain: '',
  id: UUID.empty(),
  level: LogLevel.Debug,
  message: LogMessage.of('test'),
  ...properties,
});
