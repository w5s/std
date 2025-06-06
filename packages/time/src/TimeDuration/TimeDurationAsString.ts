import type { AsString } from '@w5s/core';
import type { TimeDuration } from './TimeDuration.js';

export const TimeDurationAsString: AsString<TimeDuration> = {
  /**
   * Converts a TimeDuration object to its string representation.
   *
   * @example
   * ```typescript
   * TimeDuration.asString(TimeDuration(0)); // == "0ms"
   * TimeDuration.asString(TimeDuration({ seconds: 2, milliseconds: 0 })); // == "2000ms"
   * ```
   * @category Formatting
   * @param self - The TimeDuration object to convert.
   * @returns A string representation of the TimeDuration object.
   */
  asString(self: TimeDuration): string {
    return `${String(self)}ms`;
  },
};
