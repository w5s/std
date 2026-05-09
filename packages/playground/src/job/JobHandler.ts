import { useState } from '@w5s/application';
import { meta } from './meta.js';
import type { JobRequest } from './JobRequest.js';
import type { TaskLike } from '@w5s/task';

export interface JobHandler {
  (request: JobRequest): TaskLike<void, never>;
}

const __handlers = useState(meta, 'handlers', new Map<JobRequest['jobName'], JobHandler>() as ReadonlyMap<JobRequest['jobName'], JobHandler>);

/**
 * @namespace
 */
export const JobHandler = {
  /**
   * Registers a job handler for the specified type.
   *
   * @example
   * ```ts
   * JobHandler.register('my-job-type', (request) => {
   *   // handle the job request here
   *   return Console.log(request);
   * });
   * ```
   * @param jobName
   * @param handler
   */
  register<Request extends JobRequest>(jobName: Request['jobName'], handler: JobHandler): void {
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
