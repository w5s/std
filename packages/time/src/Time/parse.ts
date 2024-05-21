import type { Option } from '@w5s/core';
import type { Time } from './Time.js';

/**
 * Parse an ISO 8601 string. If invalid, returns `Option.None`
 *
 * @example
 * ```typescript
 * Time.parse('1970-01-01T00:00:00.000Z');// 0
 * ```
 * @param expression - an expression
 */
export function parse(expression: string): Option<Time> {
  const time = Date.parse(expression);

  return Number.isNaN(time) ? undefined : (time as Time);
}
