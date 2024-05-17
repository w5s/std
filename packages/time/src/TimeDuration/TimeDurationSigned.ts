import type { Numeric } from '@w5s/core';
import type { TimeDuration } from './TimeDuration.js';

export const TimeDurationSigned: Numeric.Signed<TimeDuration> = {
  abs: Math.abs as Numeric.Signed<TimeDuration>['abs'],
  sign: Math.sign as Numeric.Signed<TimeDuration>['sign'],
};
