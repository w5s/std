import { Callable } from '@w5s/core/dist/Callable.js';

import { from } from './LogLevel/from.js';
import { LogLevel as LogLevelType } from './LogLevel/LogLevel.js';
import { LogLevelAsInt } from './LogLevel/LogLevelAsInt.js';
import { LogLevelAsString } from './LogLevel/LogLevelAsString.js';
import { LogLevelBounded } from './LogLevel/LogLevelBounded.js';
import { LogLevelComparable } from './LogLevel/LogLevelComparable.js';
import { LogLevelValue } from './LogLevel/LogLevelValue.js';
import { of } from './LogLevel/of.js';

export interface LogLevel extends LogLevelType {}

/**
 * @example
 * @namespace
 */
export const LogLevel = Callable({
  ...LogLevelType,
  ...LogLevelComparable,
  ...LogLevelValue,
  ...LogLevelBounded,
  ...LogLevelAsString,
  ...LogLevelAsInt,
  [Callable.symbol]: of,
  from,
  of,
});
