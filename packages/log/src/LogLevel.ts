import { Callable } from '@w5s/core/dist/Callable.js';
import { LogLevel as LogLevelType } from './LogLevel/LogLevel.js';
import { LogLevelComparable } from './LogLevel/LogLevelComparable.js';
import { LogLevelBounded } from './LogLevel/LogLevelBounded.js';
import { LogLevelValue } from './LogLevel/LogLevelValue.js';
import { of } from './LogLevel/of.js';
import { from } from './LogLevel/from.js';
import { LogLevelAsString } from './LogLevel/LogLevelAsString.js';
import { asInt } from './LogLevel/asInt.js';

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
  of,
  from,
  asInt,
  [Callable.symbol]: of,
});
