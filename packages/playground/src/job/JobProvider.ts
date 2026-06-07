import type { Option } from '@w5s/core';
import type { JobEnqueue } from './JobEnqueue.js';
import type { JobRequest } from './JobRequest.js';
import type { JobId } from './JobId.js';
import type { Job } from './Job.js';

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
   * @example
   * ```ts
   * const provider: JobProvider = {
   *   async enqueue(request, options) {
   *     // Enqueue the job using your preferred method (e.g., setTimeout, a job queue library, etc.)
   *     const jobId = await myJobQueue.enqueue(request, options);
   *     return { jobId, providerJobId: jobId.toString() };
   *   },
   * };
   *
   * const MyJob = Job.define('MyJob', Type.Object({ foo: Type.string }));
   * MyJob.performLater({ foo: 'bar' });
   * ```
   * @param jobModule the job module defining the job type and request codec
   * @param request the job request containing the parameters for the job
   * @param options the options for enqueuing the job, such as delay or immediate execution
   * @returns a promise that resolves to the result of enqueuing the job, including the assigned job ID
   */
  enqueue<Request extends JobRequest>(jobModule: Job.Module<Request>, request: Request, options: JobEnqueue): Promise<JobEnqueueResult>;
}
