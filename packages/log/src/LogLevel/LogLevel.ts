import { $Object as TObject } from '@w5s/core/dist/Type/Object.js';
import { string } from '@w5s/core/dist/Type/string.js';
import { Int as TInt } from '@w5s/core/dist/Type/Int.js';
import { constant } from '@w5s/core/dist/Type/constant.js';
import type { Type } from '@w5s/core';

export const LogLevel = TObject({
  _: constant('LogLevel'),
  /**
   * Log level name
   */
  name: string,
  /**
   * Log level value (number). Often used to filter / sort logs
   */
  value: TInt,
});

export interface LogLevel extends Type.TypeOf<typeof LogLevel> {}
