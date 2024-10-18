import { IntBounded } from '@w5s/core/dist/Int/IntBounded.js';
import type { Int } from '@w5s/core';
import { of } from './of.js';

const None = of('None', IntBounded.minValue);
/**
 * Critical log level (50)
 */
const Critical = of('Critical', 50 as Int);
/**
 * Error log level (40)
 */
const Error = of('Error', 40 as Int);
/**
 * Warning log level (30)
 */
const Warning = of('Warning', 30 as Int);
/**
 * Info log level (20)
 */
const Info = of('Info', 20 as Int);
/**
 * Debug log level (10)
 */
const Debug = of('Debug', 10 as Int);

/**
 * @namespace
 */
export const LogValue = {
  None,
  Critical,
  Error,
  Warning,
  Info,
  Debug,
};
