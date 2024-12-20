import type { Int } from '@w5s/core';
import { of } from './of.js';

const None = of('none', 0 as Int);
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
const Warn = of('warn', 30 as Int);
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
  Warn,
  Info,
  Debug,
};

export type LogLevelValue = Lowercase<keyof typeof LogLevelValue>;
