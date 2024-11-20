import { IntBounded } from '@w5s/core/dist/Int/IntBounded.js';
import type { Int } from '@w5s/core';
import { of } from './of.js';

const None = of('none', IntBounded.minValue);
/**
 * Critical log level (50)
 */
const Critical = of('critical', 50 as Int);
/**
 * Error log level (40)
 */
const Error = of('error', 40 as Int);
/**
 * Warning log level (30)
 */
const Warning = of('warning', 30 as Int);
/**
 * Info log level (20)
 */
const Info = of('info', 20 as Int);
/**
 * Debug log level (10)
 */
const Debug = of('debug', 10 as Int);

/**
 * @namespace
 */
export const LogLevelValue = {
  None,
  Critical,
  Error,
  Warning,
  Info,
  Debug,
};

export type LogLevelValue = Lowercase<keyof typeof LogLevelValue>;
