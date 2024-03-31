/* eslint-disable @typescript-eslint/unbound-method */
import { invariant } from '@w5s/invariant';
import type { Numeric, Tag } from '@w5s/core';
import { Comparable } from '@w5s/core/dist/Comparable.js';
import { Number } from '@w5s/core/dist/Number.js';

const SECONDS = 1000;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;
const DAYS = HOURS * 24;

const TimeDurationComparable: Comparable<TimeDuration> = Comparable({
  compare: Number.compare as Comparable<TimeDuration>['compare'],
});

const TimeDurationNumeric: Numeric<TimeDuration> = {
  '+': Number['+'] as Numeric<TimeDuration>['+'],
  '-': Number['-'] as Numeric<TimeDuration>['-'],
  '*': Number['*'] as Numeric<TimeDuration>['*'],
  abs: Number.abs as Numeric<TimeDuration>['abs'],
  sign: Number.sign as Numeric<TimeDuration>['sign'],
};

/**
 * Represent a duration in milliseconds
 */
export type TimeDuration = number & Tag<'TimeDuration'>;

/**
 * A collection of functions to manipulate time duration (i.e amount of milliseconds)
 *
 * @namespace
 */
export const TimeDuration = {
  ...TimeDurationComparable,
  ...TimeDurationNumeric,

  /**
   * Return a duration from a number
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.of(0);// typeof duration === 'number'
   * ```
   * @category Constructor
   * @param milliseconds - Number of milliseconds
   */
  of(milliseconds: number) {
    invariant(TimeDuration.hasInstance(milliseconds), `${milliseconds} is not a valid duration value`);

    return milliseconds;
  },

  /**
   * Return `true` if `anyValue` is a valid `TimeDuration` value
   *
   * @example
   * ```typescript
   * TimeDuration.hasInstance(null); // === false
   * TimeDuration.hasInstance(TimeDuration.of(0)); // === true
   * ```
   * @category Type
   * @param anyValue - the tested value
   */
  hasInstance(anyValue: unknown): anyValue is TimeDuration {
    return typeof anyValue === 'number' && !globalThis.Number.isNaN(anyValue);
  },

  /**
   * Return a duration of `amount` milliseconds
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.milliseconds(1);// 1
   * ```
   * @category Constructor
   * @param amount - Number of milliseconds
   */
  milliseconds(amount: number) {
    return TimeDuration.of(amount);
  },

  /**
   * Return a duration of `amount` seconds
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.seconds(1);// 1000
   * ```
   * @category Constructor
   * @param amount - Number of seconds
   */
  seconds(amount: number) {
    return TimeDuration.of(amount * SECONDS);
  },

  /**
   * Return a duration of `amount` minutes
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.minutes(1);// 1000 * 60
   * ```
   * @category Constructor
   * @param amount - Number of minutes
   */
  minutes(amount: number) {
    return TimeDuration.of(amount * MINUTES);
  },

  /**
   * Return a duration of `amount` hours
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.hours(1);// 1000 * 60 * 60
   * ```
   * @category Constructor
   * @param amount - Number of hours
   */
  hours(amount: number) {
    return TimeDuration.of(amount * HOURS);
  },

  /**
   * Return a duration of `amount` days
   *
   * @example
   * ```typescript
   * const duration = TimeDuration.days(1);// 1000 * 60 * 60 * 24
   * ```
   * @category Constructor
   * @param amount - Number of days
   */
  days(amount: number) {
    return TimeDuration.of(amount * DAYS);
  },
};
