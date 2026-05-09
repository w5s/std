import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryJobProvider } from './MemoryJobProvider.js';
import { JobEnqueue } from './JobEnqueue.js';
import { Option } from '@w5s/core';
import type { JobId } from './JobId.js';

describe(MemoryJobProvider, () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('enqueues immediate jobs in memory', async () => {
    const provider = new MemoryJobProvider({ nextJobId: () => 'job-1' as JobId });
    const request = { jobName: 'email', jobPayload: { userId: '1' } };

    const result = await provider.enqueue(request, JobEnqueue.Immediate);

    expect(result).toEqual({ jobId: 'job-1', providerJobId: Option.None });
    expect(provider.size).toBe(1);
    expect(provider.peek()).toEqual({
      jobId: 'job-1',
      request,
      enqueuedAt: expect.any(Number),
      availableAt: expect.any(Number),
    });
    expect(provider.dequeue()).toEqual({
      jobId: 'job-1',
      request,
      enqueuedAt: expect.any(Number),
      availableAt: expect.any(Number),
    });
    expect(provider.size).toBe(0);
  });

  it('keeps delayed jobs out of the queue until ready', async () => {
    vi.useFakeTimers();
    const provider = new MemoryJobProvider({ now: () => Date.now(), nextJobId: () => 'job-2' as JobId });
    const request = { jobName: 'reminder', jobPayload: { userId: '1' } };

    const result = await provider.enqueue(request, JobEnqueue.Delayed(100));

    expect(result).toEqual({ jobId: 'job-2', providerJobId: Option.None });
    expect(provider.size).toBe(0);
    vi.advanceTimersByTime(99);
    expect(provider.size).toBe(0);

    vi.advanceTimersByTime(1);
    expect(provider.size).toBe(1);
    expect(provider.dequeue()).toEqual({
      jobId: 'job-2',
      request,
      enqueuedAt: expect.any(Number),
      availableAt: expect.any(Number),
    });
  });

  it('clears queued and scheduled jobs', async () => {
    vi.useFakeTimers();
    const provider = new MemoryJobProvider({ now: () => Date.now() });

    await provider.enqueue({ jobName: 'immediate', jobPayload: {} }, JobEnqueue.Immediate);
    await provider.enqueue({ jobName: 'delayed', jobPayload: {} }, JobEnqueue.Delayed(100));

    provider.clear();
    vi.advanceTimersByTime(100);

    expect(provider.size).toBe(0);
    expect(provider.dequeue()).toBeUndefined();
  });
});
