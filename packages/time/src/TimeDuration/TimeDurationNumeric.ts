import type { Numeric } from '@w5s/core/Numeric';

import { Add } from '@w5s/num/NumberConversion/Add';
import { Multiply } from '@w5s/num/NumberConversion/Multiply';
import { Power } from '@w5s/num/NumberConversion/Power';
import { Subtract } from '@w5s/num/NumberConversion/Subtract';

import type { TimeDuration } from './TimeDuration.js';

interface TimeDurationNumeric
  extends
  Numeric.Add<TimeDuration>,
  Numeric.Multiply<TimeDuration, number, TimeDuration>,
  Numeric.Power<TimeDuration, number, TimeDuration>,
  Numeric.Subtract<TimeDuration> {}
export const TimeDurationNumeric: TimeDurationNumeric = {
  ...(Add() as Numeric.Add<TimeDuration>),
  ...(Subtract() as Numeric.Subtract<TimeDuration>),
  ...(Multiply() as Numeric.Multiply<TimeDuration, number, TimeDuration>),
  ...(Power() as Numeric.Power<TimeDuration, number, TimeDuration>),
};
