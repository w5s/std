import { TimeDuration } from './TimeDuration.js';

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
export function of(milliseconds: number) {
  return TimeDuration.wrap(milliseconds);
}
