import type { TimeDuration } from './TimeDuration.js';

/**
 * Converts a TimeDuration object to its string representation.
 *
 * @example
 * ```typescript
 * TimeDuration.asString(TimeDuration(0)); // == "0ms"
 * TimeDuration.asString(TimeDuration({ seconds: 2, milliseconds: 0 })); // == "2000ms"
 * ```
 * @param self - The TimeDuration object to convert.
 * @returns A string representation of the TimeDuration object.
 */
export function asString(self: TimeDuration): string {
  return `${String(self)}ms`;
}
