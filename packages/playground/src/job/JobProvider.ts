import type { JobEnqueue } from './JobEnqueue.js';
import type { JobRequest } from './JobRequest.js';

export interface JobProvider {
  /**
   * Enqueue a job to be executed with the given request and options.
   * The provider is responsible for executing the job at the appropriate time based on the options provided.
   *
   * @param request
   * @param options
   */
  enqueue<Request extends JobRequest>(request: Request, options: JobEnqueue): Promise<void>;
}
