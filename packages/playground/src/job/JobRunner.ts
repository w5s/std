import { Task } from '@w5s/task';
import type { JobRequest } from './JobRequest.js';
import { JobHandler } from './JobHandler.js';

function dispatch(request: JobRequest): Task<void, never> {
  const handler = JobHandler.get(request.jobName);
  return (handler == null
    ? Task.resolve()
    : Task.from(handler(request)));
}

/**
 * @namespace
 */
export const JobRunner = {
  dispatch,
};
