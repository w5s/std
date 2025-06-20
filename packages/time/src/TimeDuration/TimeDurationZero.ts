import type { Numeric } from '@w5s/core';
import { NumberZero } from '@w5s/num/dist/Number/NumberZero.js';
import type { TimeDuration } from './TimeDuration.js';

export const TimeDurationZero: Numeric.Zero<TimeDuration> = NumberZero as Numeric.Zero<TimeDuration>;
