import { Codec, lazy, Tag, Type } from '@w5s/core';
import { Task } from '@w5s/task';
import { randomUUID, type UUID } from '@w5s/uuid';

export namespace Job {
  export interface Module<Request extends { _: string; payload: unknown }> {
    create(payload: Request['payload']): Task<JobId, never>;
    jobName: Request['_'];

    Request: Type.Module<Request>;
  }
}

export type JobId = Tag<'JobId'> & UUID;

export const Job = {
  define<JobName extends string, Payload>(jobName: JobName, PayloadType: Type.Module<Payload>): Job.Module<{ _: JobName; payload: Payload }> {
    const Request = Type.Object({
      _: Type.constant(jobName),
      payload: PayloadType,
    }, `${jobName}Job`);
    return {
      create(payload) {
        const request = { _: jobName, payload };
        const requestEncoded = lazy(() => Codec.encode(Request, request));
        return Task.andThen(Job.nextJobId, (jobId) => {
          // eslint-disable-next-line ts/require-await
          return Task.create<JobId, never>(async () => {
            console.log(`Running job ${jobName} with payload:`, payload, requestEncoded());
            return Task.ok(jobId);
          });
        });
      },
      jobName,
      Request,
    };
  },

  nextJobId: randomUUID() as Task<JobId, never>,
};

// export const Blah = Job.define('Blah', Type.Object({
//   foo: Type.string,
//   bar: Type.number,
// }));

// const jobId = await Blah.create({ foo: 'hello', bar: 42 }).run();
