import type { Type, Struct } from '@w5s/core';
import { Time } from '@w5s/time/dist/Time/Time.js';
import { UUID } from '@w5s/random/dist/UUID.js';
import { $Object as TObject } from '@w5s/core/dist/Type/Object.js';
import { constant } from '@w5s/core/dist/Type/constant.js';
import { string } from '@w5s/core/dist/Type/string.js';
import { Callable } from '@w5s/core/dist/Callable.js';
import { Record } from '@w5s/core/dist/Type/Record.js';
import { unknown } from '@w5s/core/dist/Type/unknown.js';
import { LogMessage } from './LogMessage.js';
import { LogLevel } from './LogLevel.js';

const LogRecordType = TObject({
  _: constant('LogRecord'),
  /**
   * Event identifier
   */
  id: UUID,
  /**
   * The log category / logger name
   */
  category: string,
  /**
   * The log category / logger name
   */
  level: LogLevel,
  /**
   * Unformatted message
   */
  message: LogMessage,
  /**
   * Time when the record was created
   */
  created: Time,
  /**
   * Additional data
   */
  data: Record(string, unknown),
});

export const LogRecord = Callable({
  [Callable.symbol]: (parameters: Struct.Parameters<LogRecord>) => ({
    _: 'LogRecord',
    ...parameters,
  }),
  ...LogRecordType,
});
export interface LogRecord extends Type.TypeOf<typeof LogRecordType> {}
