import type { Numeric } from '@w5s/core';
import { Add } from '@w5s/num/dist/NumberConversion/Add.js';
import { Subtract } from '@w5s/num/dist/NumberConversion/Subtract.js';
import { Multiply } from '@w5s/num/dist/NumberConversion/Multiply.js';
import { Power } from '@w5s/num/dist/NumberConversion/Power.js';
import type { TimeDuration } from './TimeDuration.js';

interface TimeDurationNumeric
  extends
    Numeric.Add<TimeDuration>,
    Numeric.Subtract<TimeDuration>,
    Numeric.Multiply<TimeDuration, number, TimeDuration>,
    Numeric.Power<TimeDuration, number, TimeDuration> {}
export const TimeDurationNumeric: TimeDurationNumeric = {
  ...(Add() as Numeric.Add<TimeDuration>),
  ...(Subtract() as Numeric.Subtract<TimeDuration>),
  ...(Multiply() as Numeric.Multiply<TimeDuration, number, TimeDuration>),
  ...(Power() as Numeric.Power<TimeDuration, number, TimeDuration>),
};
