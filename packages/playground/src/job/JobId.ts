import type { Tag } from '@w5s/core';

/**
 * A unique identifier for a job.
 */
export type JobId = string & Tag<'JobId'>;

/**
 * Creates a JobId from a string value.
 *
 * @example
 * ```typescript
 * const jobId = JobId('my-job-id');
 * ```
 * @param value
 */
export function JobId(value: string): JobId {
  return value as JobId;
}
