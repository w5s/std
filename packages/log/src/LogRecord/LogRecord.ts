import type { Type } from '@w5s/core';

import { constant } from '@w5s/core/dist/Type/constant.js';
import { TObject } from '@w5s/core/dist/Type/Object.js';
import { Record } from '@w5s/core/dist/Type/Record.js';
import { string } from '@w5s/core/dist/Type/string.js';
import { unknown } from '@w5s/core/dist/Type/unknown.js';
import { UUID } from '@w5s/core/dist/Type/UUID.js';
import { Time } from '@w5s/time/dist/Time/Time.js';

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
