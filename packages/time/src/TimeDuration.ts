import { Callable } from '@w5s/core/dist/Callable.js';
import { TimeDuration as TimeDurationType } from './TimeDuration/TimeDuration.js';
import { TimeDurationSigned } from './TimeDuration/TimeDurationSigned.js';
import { TimeDurationComparable } from './TimeDuration/TimeDurationComparable.js';
import { TimeDurationNumeric } from './TimeDuration/TimeDurationNumeric.js';
import { of } from './TimeDuration/of.js';
import { milliseconds } from './TimeDuration/milliseconds.js';
import { seconds } from './TimeDuration/seconds.js';
import { minutes } from './TimeDuration/minutes.js';
import { hours } from './TimeDuration/hours.js';
import { days } from './TimeDuration/days.js';

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
  of,
  milliseconds,
  seconds,
  minutes,
  hours,
  days,
});
