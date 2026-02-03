import { LogLevel } from './LogLevel.js';
import { LogLevelValue } from './LogLevelValue.js';

const logLevelMap = Object.fromEntries(
  Object.entries(LogLevelValue).map(([k, v]) => [k.toLowerCase() as any, v]),
) as Record<LogLevelValue, LogLevel>;

/**
 *
 * @example
 * ```typescript
 * LogLevel.from('critical') // LogLevel.Critical
 * ```
 * @param value - the level named value
 */
export function from(value: LogLevelValue): LogLevel {
  return logLevelMap[value];
}
