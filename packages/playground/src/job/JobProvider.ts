import type { Option } from '@w5s/core';
import type { JobEnqueue } from './JobEnqueue.js';
import type { JobRequest } from './JobRequest.js';
import type { JobId } from './JobId.js';

export interface JobEnqueueResult {
  jobId: JobId;

  /**
   * Internal job id assigned by the provider, if any.
   */
  providerJobId: Option<string>;
}

export interface JobProvider {
  /**
   * Enqueue a job to be executed with the given request and options.
   * The provider is responsible for executing the job at the appropriate time based on the options provided.
   *
   * @param request
   * @param options
   */
  enqueue<Request extends JobRequest>(request: Request, options: JobEnqueue): Promise<JobEnqueueResult>;
}
