import { Callable } from '@w5s/core/dist/Callable.js';

import { from } from './TimeDuration/from.js';
import { of } from './TimeDuration/of.js';
import { TimeDuration as TimeDurationType } from './TimeDuration/TimeDuration.js';
import { TimeDurationAsString } from './TimeDuration/TimeDurationAsString.js';
import { TimeDurationComparable } from './TimeDuration/TimeDurationComparable.js';
import { TimeDurationNegate } from './TimeDuration/TimeDurationNegate.js';
import { TimeDurationNumeric } from './TimeDuration/TimeDurationNumeric.js';
import { TimeDurationSigned } from './TimeDuration/TimeDurationSigned.js';
import { TimeDurationZero } from './TimeDuration/TimeDurationZero.js';
import { toDays } from './TimeDuration/toDays.js';
import { toHours } from './TimeDuration/toHours.js';
import { toMinutes } from './TimeDuration/toMinutes.js';
import { toSeconds } from './TimeDuration/toSeconds.js';
import { toWeeks } from './TimeDuration/toWeeks.js';

export type { TimeDurationParameters } from './TimeDuration/from.js';

/**
 * Represent a duration in milliseconds
 */
export type TimeDuration = TimeDurationType;

/**
 * A collection of functions to manipulate time duration (i.e amount of milliseconds)
 *
 * @namespace
 */
export const TimeDuration = Callable({
  ...TimeDurationType,
  ...TimeDurationComparable,
  ...TimeDurationNumeric,
  ...TimeDurationSigned,
  ...TimeDurationNegate,
  ...TimeDurationAsString,
  ...TimeDurationZero,
  [Callable.symbol]: from,
  from,
  of,
  toDays,
  toHours,
  toMinutes,
  toSeconds,
  toWeeks,
});
