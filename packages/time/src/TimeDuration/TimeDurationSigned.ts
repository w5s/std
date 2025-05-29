import type { Numeric } from '@w5s/core';
import { NumberSigned } from '@w5s/core/dist/Number/NumberSigned.js';
import type { TimeDuration } from './TimeDuration.js';

export const TimeDurationSigned: Numeric.Signed<TimeDuration> = NumberSigned as Numeric.Signed<TimeDuration>;
