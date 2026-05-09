export interface JobRequest {
  /**
   * The name of the job type, used to identify the appropriate handler for processing the job.
   * This should be a string that uniquely identifies the type of job being requested.
   */
  jobName: string;

  /**
   * The payload of the job request, containing the data necessary for processing the job.
   */
  jobPayload: Record<string, unknown>;
}
