import type { Numeric } from '@w5s/core';
import { NumberNumeric } from '@w5s/core/dist/Number/NumberNumeric.js';
import type { TimeDuration } from './TimeDuration.js';

interface TimeDurationNumeric
  extends Numeric.Add<TimeDuration>,
    Numeric.Subtract<TimeDuration>,
    Numeric.Multiply<TimeDuration, number> {}
export const TimeDurationNumeric: TimeDurationNumeric = {
  '+': NumberNumeric['+'] as TimeDurationNumeric['+'],
  '-': NumberNumeric['-'] as TimeDurationNumeric['-'],
  '*': NumberNumeric['*'] as TimeDurationNumeric['*'],
};
