import type { Struct } from '@w5s/core';
import { Callable } from '@w5s/core/dist/Callable.js';
import { LogRecord as LogRecordType } from './LogRecord/LogRecord.js';

export const LogRecord = Callable({
  [Callable.symbol]: (parameters: Struct.Parameters<LogRecord>) => ({
    _: 'LogRecord',
    ...parameters,
  }),
  ...LogRecordType,
});
export interface LogRecord extends LogRecordType {}
