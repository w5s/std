export type JobEnqueue =
  | { _: 'JobEnqueueImmediate' }
  | { _: 'JobEnqueueDelayed'; delay: number };
export const JobEnqueue = {
  /**
   * Immediate job enqueue option, the job will be executed as soon as possible.
   *
   * @example
   * JobEnqueue.Immediate
   */
  Immediate: { _: 'JobEnqueueImmediate' } satisfies JobEnqueue,

  /**
   * Creates a delayed job enqueue option.
   *
   * @example
   * JobEnqueue.Delayed(5000) // The job will be executed after 5 seconds
   * @param delay
   */
  Delayed: (delay: number): JobEnqueue => ({ _: 'JobEnqueueDelayed', delay }),
};
