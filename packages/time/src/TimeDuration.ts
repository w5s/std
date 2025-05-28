import { Callable } from '@w5s/core/dist/Callable.js';
import { TimeDuration as TimeDurationType } from './TimeDuration/TimeDuration.js';
import { TimeDurationSigned } from './TimeDuration/TimeDurationSigned.js';
import { TimeDurationComparable } from './TimeDuration/TimeDurationComparable.js';
import { TimeDurationNumeric } from './TimeDuration/TimeDurationNumeric.js';
import { asString } from './TimeDuration/asString.js';
import { of } from './TimeDuration/of.js';
import { from } from './TimeDuration/from.js';
import { milliseconds } from './TimeDuration/milliseconds.js';
import { seconds } from './TimeDuration/seconds.js';
import { minutes } from './TimeDuration/minutes.js';
import { hours } from './TimeDuration/hours.js';
import { days } from './TimeDuration/days.js';
import { weeks } from './TimeDuration/weeks.js';
import { toSeconds } from './TimeDuration/toSeconds.js';
import { toMinutes } from './TimeDuration/toMinutes.js';
import { toHours } from './TimeDuration/toHours.js';
import { toDays } from './TimeDuration/toDays.js';
import { toWeeks } from './TimeDuration/toWeeks.js';
import { TimeDurationNegate } from './TimeDuration/TimeDurationNegate.js';

export type { TimeDurationObject as TimeDurationParameters } from './TimeDuration/from.js';

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
  asString,
  toSeconds,
  toMinutes,
  toHours,
  toDays,
  toWeeks,
  of,
  from,
  milliseconds,
  seconds,
  minutes,
  hours,
  days,
  weeks,
  [Callable.symbol]: from,
});
