import type { Numeric } from '@w5s/core/Numeric';
import { Negate } from '@w5s/num/NumberConversion/Negate';
import type { TimeDuration } from './TimeDuration.js';

export const TimeDurationNegate: Numeric.Negate<TimeDuration> = Negate() as Numeric.Negate<TimeDuration>;
