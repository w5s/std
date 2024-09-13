import type { Type } from '@w5s/core';
import { constant } from '@w5s/core/dist/Type/constant.js';
import { union } from '@w5s/core/dist/Type/union.js';
import { TimeDuration } from '@w5s/time/dist/TimeDuration/TimeDuration.js';

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
  TimeDuration
);

export type RequestTimeout = Type.TypeOf<typeof RequestTimeout>;
