import { useState } from '@w5s/application';
import { meta } from './meta.js';
import type { JobRequest } from './JobRequest.js';
import type { Option } from '@w5s/core';
import type { TaskLike } from '@w5s/task';

export interface JobHandler<Request = JobRequest> {
  (request: Request): TaskLike<void, never>;
}

const __handlers = useState(meta, 'handlers', new Map<JobRequest['jobName'], JobHandler>() as ReadonlyMap<JobRequest['jobName'], JobHandler<any>>);

/**
 * @namespace
 */
export const JobHandler = {
  /**
   * Retrieves a job handler for the specified type, if it exists.
   *
   * @example
   * ```ts
   * const handler = JobHandler.get('my-job-type');
   * if (handler) {
   *   handler({ ... }); // call the handler with a job request
   * }
   * ```
   * @param jobName
   */
  get<Request extends JobRequest>(jobName: Request['jobName']): Option<JobHandler<Request>> {
    return __handlers.current.get(jobName) as Option<JobHandler<Request>>;
  },

  /**
   * Registers a job handler for the specified type.
   *
   * @example
   * ```ts
   * JobHandler.register('my-job-type', (request) => {
   *   // handle the job request here
   *   console.log(request);
   * });
   * ```
   * @param jobName
   * @param handler
   */
  register<Request extends JobRequest>(jobName: Request['jobName'], handler: JobHandler<Request>): void {
    __handlers.current = new Map(__handlers.current).set(jobName, handler);
  },

  /**
   * Unregisters a job handler for the specified type.
   *
   * @example
   * ```ts
   * JobHandler.unregister('my-job-type');
   * ```
   * @param jobName
   */
  unregister(jobName: JobRequest['jobName']): void {
    const newHandlers = new Map(__handlers.current);
    newHandlers.delete(jobName);
    __handlers.current = newHandlers;
  },
};
