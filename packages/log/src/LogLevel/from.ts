import { LogLevel } from './LogLevel.js';
import { LogLevelValue } from './LogLevelValue.js';

const logLevelMap = Object.fromEntries(
  Object.entries(LogLevelValue).map(([k, v]) => [k.toLowerCase() as any, v]),
) as Record<LogLevelValue, LogLevel>;

/**
 *
 * @example
 * ```ts
 * LogLevel.from('critical') // LogLevel.Critical
 * ```
 * @param level
 */
export function from(value: LogLevelValue) {
  return logLevelMap[value];
}
