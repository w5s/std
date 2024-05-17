import { Time } from './Time.js';

/**
 * Create a new Time value
 *
 * @example
 * ```typescript
 * const time = Time.of(0);
 * ```
 * @category Constructor
 * @param milliseconds - the value in milliseconds
 */
export function of(milliseconds: number): Time {
  return Time(milliseconds);
}
