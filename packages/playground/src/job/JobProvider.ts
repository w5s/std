import type { JobRequest } from './JobRequest.js';

export type JobEnqueueOptions =
  | { _: 'delayed'; delay: number }
  | { _: 'immediate' };

export interface JobProvider {
  /**
   * Enqueue a job to be executed with the given request and options.
   * The provider is responsible for executing the job at the appropriate time based on the options provided.
   *
   * @param request
   * @param options
   */
  enqueue<Request extends JobRequest>(request: Request, options: JobEnqueueOptions): Promise<void>;
}
