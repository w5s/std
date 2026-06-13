import type { Bounded } from '@w5s/core/Bounded';
import { LogLevelValue } from './LogLevelValue.js';
import type { LogLevel } from './LogLevel.js';

export const LogLevelBounded: Bounded<LogLevel> = {
  minValue: LogLevelValue.None,
  maxValue: LogLevelValue.Critical,
};
