import type { Numeric } from '@w5s/core';
import { Zero } from '@w5s/num/dist/NumberConversion/Zero.js';
import type { TimeDuration } from './TimeDuration.js';

export const TimeDurationZero: Numeric.Zero<TimeDuration> = Zero() as Numeric.Zero<TimeDuration>;
