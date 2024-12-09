import type { Struct } from '@w5s/core';
import { Callable } from '@w5s/core/dist/Callable.js';
import { LogRecord as LogRecordType } from './LogRecord/LogRecord.js';
import { messageWithData } from './LogRecord/messageWithData.js';

export const LogRecord = Callable({
  [Callable.symbol]: (parameters: Struct.Parameters<LogRecord>): LogRecord => ({
    _: 'LogRecord',
    ...parameters,
  }),
  ...LogRecordType,
  messageWithData,
});
export interface LogRecord extends LogRecordType {}
