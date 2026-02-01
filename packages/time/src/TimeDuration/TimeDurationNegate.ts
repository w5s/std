import type { Numeric } from '@w5s/core';
import { Negate } from '@w5s/num/dist/NumberConversion/Negate.js';
import type { TimeDuration } from './TimeDuration.js';

export const TimeDurationNegate: Numeric.Negate<TimeDuration> = Negate() as Numeric.Negate<TimeDuration>;
