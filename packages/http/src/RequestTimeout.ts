import type { Type } from '@w5s/core/Type';
import { constant } from '@w5s/core/Type/constant';
import { union } from '@w5s/core/Type/union';
import { TimeDuration } from '@w5s/time/TimeDuration/TimeDuration';

/**
 * Request timeout setting
 */
export const RequestTimeout = union(
  /**
   * No Timeout
   */
  constant('none'),

  /**
   * Default timeout value (30sec)
   */
  constant('default'),

  /**
   * Custom timeout value
   */
  TimeDuration,
);

export type RequestTimeout = Type.TypeOf<typeof RequestTimeout>;
