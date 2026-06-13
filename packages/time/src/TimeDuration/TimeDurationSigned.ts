import type { Numeric } from '@w5s/core/Numeric';
import { Signed } from '@w5s/num/NumberConversion/Signed';
import type { TimeDuration } from './TimeDuration.js';

export const TimeDurationSigned: Numeric.Signed<TimeDuration> = Signed() as Numeric.Signed<TimeDuration>;
