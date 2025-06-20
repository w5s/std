import type { Numeric } from '@w5s/core';
import { NumberNumeric } from '@w5s/num/dist/Number/NumberNumeric.js';
import type { TimeDuration } from './TimeDuration.js';

interface TimeDurationNumeric
  extends Numeric.Add<TimeDuration>,
    Numeric.Subtract<TimeDuration>,
    Numeric.Multiply<TimeDuration, number, TimeDuration>,
    Numeric.Power<TimeDuration, number, TimeDuration> {}
export const TimeDurationNumeric: TimeDurationNumeric = {
  '+': NumberNumeric['+'] as TimeDurationNumeric['+'],
  '-': NumberNumeric['-'] as TimeDurationNumeric['-'],
  '*': NumberNumeric['*'] as TimeDurationNumeric['*'],
  '**': NumberNumeric['**'] as TimeDurationNumeric['**'],
};
