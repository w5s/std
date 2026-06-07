import { Type } from '@w5s/core';
import { Task } from '@w5s/task';
import { configuration } from './configuration.js';
import type { JobRequest } from './JobRequest.js';
import { JobEnqueue } from './JobEnqueue.js';
import type { JobId } from './JobId.js';
import { JobHandler } from './JobHandler.js';

export namespace Job {
  export interface Module<Request extends JobRequest> {
    /**
     * The name of the job, used to identify the job type and retrieve the corresponding handler.
     */
    jobName: Request['jobName'];

    /**
     * The codec for the job request, used to encode and decode job requests when enqueuing and executing jobs.
     */
    Request: Type.Module<Request>;

    /**
     * Enqueues a job to be executed later with the given parameters.
     *
     * @param parameters The parameters of the job, which will be passed to the job handler when the job is executed.
     */
    performLater(parameters: Request['parameters']): Task<JobId, never>;

    /**
     * Defines a job implementation
     *
     * @example
     * ```ts
     * const MyJob = Job.define('MyJob', Type.Object({
     *   foo: Type.string,
     * }));
     *
     * Job.implement(MyJob, (request) =>
     *   Console.log(request.parameters.foo)
     * );
     * ```
     * @param handler
     */
    implement(handler: JobHandler<Request>): void;
  }
}

export const Job = {

  define<JobName extends JobRequest['jobName'], Payload extends JobRequest['parameters']>(jobName: JobName, ParameterType: Type.Module<Payload>): Job.Module<{ jobName: JobName; parameters: Payload }> {
    const Request = Type.Object({
      jobName: Type.constant(jobName),
      parameters: ParameterType,
    }, jobName);

    const instance: Job.Module<{ jobName: JobName; parameters: Payload }> = {
      jobName,
      Request,
      performLater(parameters) {
        const request = { jobName, parameters };
        return Task.create<JobId, never>(async () => {
          const { provider } = configuration.current;

          const { jobId } = await provider.enqueue(instance, request, JobEnqueue.Immediate);
          return Task.ok(jobId);
        });
      },
      implement(handler) {
        Job.implement(instance, handler);
      },
    };
    return instance;
  },

  /**
   * Defines a job implementation
   *
   * @example
   * ```ts
   * const MyJob = Job.define('MyJob', Type.Object({
   *   foo: Type.string,
   * }));
   *
   * Job.implement(MyJob, (request) =>
   *   Console.log(request.parameters.foo)
   * );
   * ```
   * @param module
   * @param handler
   */
  implement<Request extends JobRequest>(module: Job.Module<Request>, handler: JobHandler<Request>): void {
    JobHandler.register(module.jobName, handler);
  },
};
