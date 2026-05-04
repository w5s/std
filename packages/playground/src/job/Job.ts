import { Codec, lazy, Tag, Type } from '@w5s/core';
import { Task } from '@w5s/task';
import { randomUUID, type UUID } from '@w5s/uuid';

export namespace Job {
  export interface Module<Request extends { _: string; payload: unknown }> {
    jobName: Request['_'];
    Request: Type.Module<Request>;

    create(payload: Request['payload']): Task<JobId, never>;
  }
}

export type JobId = UUID & Tag<'JobId'>;

export const Job = {
  nextJobId: randomUUID() as Task<JobId, never>,

  define<JobName extends string, Payload>(jobName: JobName, PayloadType: Type.Module<Payload>): Job.Module<{ _: JobName; payload: Payload }> {
    const Request = Type.Object({
      _: Type.constant(jobName),
      payload: PayloadType,
    }, `${jobName}Job`);
    return {
      jobName,
      Request,
      create(payload) {
        const request = { _: jobName, payload };
        const requestEncoded = lazy(() => Codec.encode(Request, request));
        return Task.andThen(Job.nextJobId, (jobId) => {
          return Task.create<JobId, never>(async () => {
            console.log(`Running job ${jobName} with payload:`, payload, requestEncoded());
            return Task.ok(jobId as JobId);
          });
        });
      },
    };
  },
};

// export const Blah = Job.define('Blah', Type.Object({
//   foo: Type.string,
//   bar: Type.number,
// }));

// const jobId = await Blah.create({ foo: 'hello', bar: 42 }).run();
