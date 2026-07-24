import type { Bounded } from '@w5s/core';

import type { LogLevel } from './LogLevel.js';

import { LogLevelValue } from './LogLevelValue.js';

export const LogLevelBounded: Bounded<LogLevel> = {
  maxValue: LogLevelValue.Critical,
  minValue: LogLevelValue.None,
};
