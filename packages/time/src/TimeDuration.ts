import { Callable } from '@w5s/core/dist/Callable.js';
import { TimeDuration as TimeDurationType } from './TimeDuration/TimeDuration.js';
import { TimeDurationSigned } from './TimeDuration/TimeDurationSigned.js';
import { TimeDurationComparable } from './TimeDuration/TimeDurationComparable.js';
import { TimeDurationNumeric } from './TimeDuration/TimeDurationNumeric.js';
import { TimeDurationAsString } from './TimeDuration/TimeDurationAsString.js';
import { of } from './TimeDuration/of.js';
import { from } from './TimeDuration/from.js';
import { toSeconds } from './TimeDuration/toSeconds.js';
import { toMinutes } from './TimeDuration/toMinutes.js';
import { toHours } from './TimeDuration/toHours.js';
import { toDays } from './TimeDuration/toDays.js';
import { toWeeks } from './TimeDuration/toWeeks.js';
import { TimeDurationNegate } from './TimeDuration/TimeDurationNegate.js';
import { TimeDurationZero } from './TimeDuration/TimeDurationZero.js';

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
  toSeconds,
  toMinutes,
  toHours,
  toDays,
  toWeeks,
  of,
  from,
  [Callable.symbol]: from,
});
