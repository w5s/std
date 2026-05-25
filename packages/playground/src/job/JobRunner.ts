import type { Option } from '@w5s/core';
import { from } from '@w5s/task/dist/Task/from.js';
import { andThen } from '@w5s/task/dist/Task/andThen.js';
import { reject } from '@w5s/task/dist/Task/reject.js';
import type { JobRequest } from './JobRequest.js';
import { JobHandler } from './JobHandler.js';
import { InvariantError } from '@w5s/error/dist/InvariantError.js';
import type { Task } from '@w5s/task';

function dispatch(request: JobRequest): Task<void, InvariantError> {
  const handlerTask = from<Option<JobHandler>, never>(({ resolve }) => resolve(JobHandler.get(request.jobName)));

  return andThen(handlerTask, (handler) =>
    handler == null
      ? reject(new InvariantError(`No handler found for job: ${request.jobName}`))
      : handler(request),
  );
}

/**
 * @namespace
 */
export const JobRunner = {
  dispatch,
};
