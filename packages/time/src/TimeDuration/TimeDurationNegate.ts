import type { Numeric } from '@w5s/core';
import { NumberNegate } from '@w5s/core/dist/Number/NumberNegate.js';
import type { TimeDuration } from './TimeDuration.js';

export const TimeDurationNegate: Numeric.Negate<TimeDuration> = NumberNegate as Numeric.Negate<TimeDuration>;
