import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Type, Result } from '@w5s/core';
import { Task } from '@w5s/task';
import { Job } from './Job.js';
import { JobEnqueue } from './JobEnqueue.js';
import { JobHandler } from './JobHandler.js';
import type { JobId } from './JobId.js';
import { configuration } from './configuration.js';
import type { JobProvider } from './JobProvider.js';

describe('Job', () => {
  const previousConfiguration = configuration.current;

  beforeEach(() => {
    configuration.current = previousConfiguration;
  });

  it('defines a module and enqueues requests with performLater', async () => {
    const provider = {
      enqueue: vi.fn(async () => ({
        jobId: 'job-1' as JobId,
        providerJobId: undefined,
      })),
    } satisfies JobProvider;
    configuration.current = { provider };

    const EmailJob = Job.define('EmailJob', Type.Object({
      to: Type.string,
      retries: Type.number,
    }));

    expect(EmailJob.jobName).toBe('EmailJob');

    const result = await EmailJob.performLater({ to: 'dev@w5s.io', retries: 2 }).run();

    expect(Result.getOrThrow(result)).toBe('job-1');
    expect(provider.enqueue).toHaveBeenCalledTimes(1);
    expect(provider.enqueue).toHaveBeenCalledWith(
      {
        jobName: 'EmailJob',
        parameters: { to: 'dev@w5s.io', retries: 2 },
      },
      JobEnqueue.Immediate,
    );
  });

  it('registers handlers via implement', () => {
    const handler = vi.fn(() => Task.resolve());
    const ReportJob = Job.define('ReportJob', Type.Object({
      reportId: Type.string,
    }));

    Job.implement(ReportJob, handler);

    const registered = JobHandler.get('ReportJob');
    expect(registered).toBeDefined();

    const request = { jobName: 'ReportJob', parameters: { reportId: 'r-1' } };
    const task = registered?.(request);

    expect(task).toBeDefined();
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(request);
  });
});
