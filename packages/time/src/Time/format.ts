import type { Time } from './Time.js';

/**
 * Return an ISO 8601 string representation
 *
 * @example
 * ```typescript
 * const time = Time.of(0);
 * Time.format(time);// '1970-01-01T00:00:00.000Z'
 * ```
 * @param self - A time value
 */
export function format(self: Time): string {
  return new Date(self).toISOString();
}
