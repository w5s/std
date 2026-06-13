import type { Type } from '@w5s/core/Type';

import { constant } from '@w5s/core/Type/constant';
import { TObject } from '@w5s/core/Type/Object';
import { Record } from '@w5s/core/Type/Record';
import { string } from '@w5s/core/Type/string';
import { unknown } from '@w5s/core/Type/unknown';
import { UUID } from '@w5s/core/Type/UUID';
import { Time } from '@w5s/time/Time/Time';

import { LogLevel } from '../LogLevel/LogLevel.js';
import { LogMessage } from '../LogMessage.js';

export const LogRecord = TObject({
  _: constant('LogRecord'),

  /**
   * Time when the record was created
   */
  created: Time,

  /**
   * Additional data
   */
  data: Record(string, unknown),

  /**
   * The log domain (i.e. category)
   */
  domain: string,

  /**
   * Event identifier
   */
  id: UUID,

  /**
   * The log level
   */
  level: LogLevel,

  /**
   * Unformatted message
   */
  message: LogMessage,
});
export interface LogRecord extends Type.TypeOf<typeof LogRecord> {}
