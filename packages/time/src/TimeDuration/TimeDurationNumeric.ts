import type { Numeric } from '@w5s/core';
import { NumberNumeric } from '@w5s/core/dist/Number/NumberNumeric.js';
import type { TimeDuration } from './TimeDuration.js';

export const TimeDurationNumeric: Numeric<TimeDuration> = {
  '+': NumberNumeric['+'] as Numeric<TimeDuration>['+'],
  '-': NumberNumeric['-'] as Numeric<TimeDuration>['-'],
  '*': NumberNumeric['*'] as Numeric<TimeDuration>['*'],
};
