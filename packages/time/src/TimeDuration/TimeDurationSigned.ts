import type { Numeric } from '@w5s/core';
import { Signed } from '@w5s/num/dist/NumberConversion/Signed.js';
import type { TimeDuration } from './TimeDuration.js';

export const TimeDurationSigned: Numeric.Signed<TimeDuration> = Signed() as Numeric.Signed<TimeDuration>;
