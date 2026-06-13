import type { Numeric } from '@w5s/core/Numeric';
import { Zero } from '@w5s/num/NumberConversion/Zero';
import type { TimeDuration } from './TimeDuration.js';

export const TimeDurationZero: Numeric.Zero<TimeDuration> = Zero() as Numeric.Zero<TimeDuration>;
